import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ScreenContext } from './screen-context';
import { ScreenSpanning } from './screen-spanning';

/**
 * Defines how the split layout container should be rendered when multi screen
 * is detected.
 * See {@link SplitLayoutDirective}
 */
export type SplitLayoutMode = 'flex' | 'grid' | 'absolute';
/**
 * Enumeration of split layout modes values for use with
 * {@link SplitLayoutDirective}.
 */
export const SplitLayoutMode = {
  Flex: 'flex' as SplitLayoutMode,
  Grid: 'grid' as SplitLayoutMode,
  Absolute: 'absolute' as SplitLayoutMode,

  /**
   * Checks if the given string value is a valid {@link SplitLayoutMode}.
   *
   * @param value The value to check.
   * @return true if the value is a valid {@link SplitLayoutMode}.
   */
  isValid: (value: string): boolean => {
    switch (value) {
      case SplitLayoutMode.Flex:
      case SplitLayoutMode.Grid:
      case SplitLayoutMode.Absolute:
        return true;
    }
    return false;
  },
};

/**
 * Defines how the split layout container should order the window segments
 * when in horizontal spanning mode vs vertical spanning mode.
 * See {@link SplitLayoutDirective}
 */
export type WindowOrder = 'normal' | 'reverse';
/**
 * Enumeration of window order values for use with
 * {@link SplitLayoutDirective}.
 */
export const WindowOrder = {
  Normal: 'normal' as WindowOrder,
  Reverse: 'reverse' as WindowOrder,

  /**
   * Checks if the given string value is a valid {@link WindowOrder}.
   *
   * @param value The value to check.
   * @return true if the value is a valid {@link WindowOrder}.
   */
  isValid: (value: string): boolean => {
    switch (value) {
      case WindowOrder.Normal:
      case WindowOrder.Reverse:
        return true;
    }
    return false;
  },
};

/**
 * Defines the text reading direction for the host element.
 */
export type ReadingDirection = 'ltr' | 'rtl';
/**
 * Enumeration of the text reading direction values.
 */
export const ReadingDirection = {
  LeftToRight: 'ltr' as ReadingDirection,
  RightToLeft: 'rtl' as ReadingDirection,
};

/**
 * Look 'ma, CSS-in-JS with Angular! ಠ_ಠ
 *
 * @ignore
 */
const layoutStyles = {
  [SplitLayoutMode.Flex]: {
    common: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '100vh',
    },
    [ScreenSpanning.Vertical]: {
      flexDirection: 'row',
    },
    [ScreenSpanning.Horizontal]: {
      flexDirection: 'column',
    },
    [WindowOrder.Reverse]: {
      flexDirection: 'column-reverse',
    },
  },
  [SplitLayoutMode.Grid]: {
    common: {
      display: 'grid',
      height: '100vh',
    },
    [ScreenSpanning.Vertical]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: '"segment0 segment1"',
      gridAutoFlow: 'row',
      columnGap: 'env(fold-width)',
    },
    [ScreenSpanning.Horizontal]: {
      gridTemplateRows: '1fr 1fr',
      gridTemplateAreas: '"segment0" "segment1"',
      gridAutoFlow: 'row',
      rowGap: 'env(fold-height)',
    },
    [WindowOrder.Reverse]: {
      gridTemplateRows: '1fr 1fr',
      gridTemplateAreas: '"segment1" "segment0"',
      gridAutoFlow: 'row',
      rowGap: 'env(fold-height)',
    },
  },
  [SplitLayoutMode.Absolute]: {
    common: {
      position: 'relative',
      height: '100vh',
    },
    [ScreenSpanning.Vertical]: {},
    [ScreenSpanning.Horizontal]: {},
    [WindowOrder.Reverse]: {},
  },
};

/**
 * Defines a parent layout container for creating a split layout on multi
 * screen devices.
 *
 * When used on a single screen device, no layout change (CSS) is added.
 * You can choose between different {@link SplitLayoutMode} to suit your
 * design.
 *
 * This directive should be used along with {@link WindowDirective}.
 *
 * @example
 * <div fdSplitLayout="grid">
 *              <section fdWindow="0">Will be displayed on first screen</section>
 *              <section fdWindow="1">Will be displayed on second screen (if available)</section>
 * </div>
 *
 * In addition, you can also choose keep the same window segments order or
 * reverse it when the spanning mode change from vertical to horizontal using
 * a second optional parameter on the directive:
 *
 *  * @example
 * <div fdSplitLayout="flex reverse">
 *              <section fdWindow="0">
 *                Will be displayed on first screen in vertical spanning mode
 *                and on the second screen in horizontal spanning mode.
 *              </section>
 *              <section fdWindow="1">
 *                Will be displayed on second screen in vertical spanning mode
 *                and on the first screen in horizontal spanning mode.
 *              </section>
 * </div>
 */
@Directive({
  selector: '[fdSplitLayout]',
})
export class SplitLayoutDirective implements OnDestroy {
  private mode: SplitLayoutMode = SplitLayoutMode.Flex;
  private order: WindowOrder = WindowOrder.Normal;
  private layoutStyle: SafeStyle = {};
  private screenContextSubscription: Subscription | null = null;
  private direction: ReadingDirection = 'ltr';

  /**
   * Sets the current split layout options to use when multi screen is
   * detected.
   *
   * @param options The split layout options to use.
   * Format: `[mode] [order]`
   * - The {@link SplitLayoutMode} to use (default is {@link SplitLayoutMode.Flex}).
   * - The {@link WindowOrder} to use (default is {@link WindowOrder.Normal}).
   */
  @Input()
  set fdSplitLayout(options: string | undefined) {
    this.parseOptions(options || '');
    this.updateStyle();
  }

  /** @ignore */
  @HostBinding('style')
  get style(): SafeStyle {
    return this.layoutStyle;
  }

  constructor(
    private element: ElementRef,
    private screenContext: ScreenContext
  ) {
    this.updateStyle();
    this.screenContextSubscription = this.screenContext
      .asObservable()
      .subscribe(() => this.updateStyle());
  }

  /**
   * The current split layout mode to use when multi screen is detected.
   *
   * @return The current split layout mode.
   */
  get layoutMode(): SplitLayoutMode {
    return this.mode;
  }

  /**
   * The window segments order to use when in horizontal spanning mode.
   *
   * @return The current window order.
   */
  get windowOrder(): WindowOrder {
    return this.order;
  }

  /**
   * The text reading direction for the host element.
   *
   * @return The text reading direction.
   */
  get readingDirection(): ReadingDirection {
    return this.direction;
  }

  /** @ignore */
  ngOnDestroy() {
    if (this.screenContextSubscription !== null) {
      this.screenContextSubscription.unsubscribe();
    }
  }

  private parseOptions(options: string) {
    let [mode, order] = options.trim().split(' ');
    mode = SplitLayoutMode.isValid(mode) ? mode : SplitLayoutMode.Flex;
    order = WindowOrder.isValid(order) ? order : WindowOrder.Normal;
    this.mode = mode as SplitLayoutMode;
    this.order = order as WindowOrder;
  }

  private updateStyle() {
    const isMultiScreen = this.screenContext.isMultiScreen;
    const spanning = this.screenContext.screenSpanning;
    const reverse =
      spanning === ScreenSpanning.Horizontal &&
      this.order === WindowOrder.Reverse;

    this.direction =
      (getComputedStyle(this.element.nativeElement)
        ?.direction as ReadingDirection) || ReadingDirection.LeftToRight;

    if (isMultiScreen && spanning !== ScreenSpanning.None) {
      this.layoutStyle = {
        ...layoutStyles[this.mode].common,
        ...layoutStyles[this.mode][reverse ? WindowOrder.Reverse : spanning],
      };
    } else {
      this.layoutStyle = {};
    }
  }
}
