import { Directive, Host, HostBinding, Input, OnDestroy } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ScreenContext } from './screen-context';
import { ScreenSpanning } from './screen-spanning';
import {
  ReadingDirection,
  SplitLayoutDirective,
  SplitLayoutMode,
  WindowOrder,
} from './split-layout.directive';

/**
 * Look 'ma, CSS-in-JS with Angular! ಠ_ಠ
 *
 * @ignore
 */
const layoutStyles = {
  [SplitLayoutMode.Flex]: {
    [ScreenSpanning.DualHorizontal]: [
      { flex: '0 0 env(viewport-segment-width 0 0)' },
      { flex: '0 0 env(viewport-segment-width 1 0)' },
    ],
    [ScreenSpanning.DualVertical]: [
      { flex: '0 0 env(viewport-segment-height 0 0)' },
      { flex: '0 0 env(viewport-segment-height 0 1)' },
    ],
  },
  [SplitLayoutMode.Grid]: {
    [ScreenSpanning.DualHorizontal]: [
      { gridArea: 'segment0' },
      { gridArea: 'segment1' },
    ],
    [ScreenSpanning.DualVertical]: [
      {
        gridArea: 'segment0',
        height: 'env(viewport-segment-height 0 0)'
      },
      {
        gridArea: 'segment1',
        height: 'env(viewport-segment-height 0 1)'
      },
    ],
  },
  [SplitLayoutMode.Absolute]: {
    [ScreenSpanning.DualHorizontal]: [
      {
        position: 'absolute',
        left: 0,
        width: 'env(viewport-segment-right 0 0)',
      },
      {
        position: 'absolute',
        left: 'env(viewport-segment-left 1 0)',
        right: 0,
      },
    ],
    [ScreenSpanning.DualVertical]: [
      {
        position: 'absolute',
        top: 0,
        width: '100%',
        maxHeight: 'env(viewport-segment-height 0 0)',
      },
      {
        position: 'absolute',
        top: 'env(viewport-segment-top 0 1)',
        width: '100%',
        maxHeight: 'env(viewport-segment-height 0 1)',
      },
    ],
  },
};

/**
 * This directive is used to set specify on which window segment the container
 * should be placed on multi screen devices.
 *
 * When used on a single screen device, no layout change (CSS) is added.
 * Only devices with up to two screen are currently supported, meaning that the
 * window segment value must be either 0 or 1.
 *
 * This directive can only be used within a {@link SplitLayoutDirective}.
 * If {@link SplitLayoutMode} is set to `absolute`, you can assign multiple
 * container element to the same window segment.
 *
 * Note that if you have set the read direction to Right-To-Left mode (`rtl`)
 * in CSS, the first segment will be the rightmost one.
 *
 * If the {@link WindowOrder} option is set to {@link WindowOrder.Reverse},
 * the window segments order will be reversed in horizontal spanning mode.
 *
 * @example
 * <div fdSplitLayout="grid">
 *              <section fdWindow="0">Will be displayed on first screen</section>
 *              <section fdWindow="1">Will be displayed on second screen (if available)</section>
 * </div>
 */
@Directive({
  selector: '[fdWindow]',
})
export class WindowDirective implements OnDestroy {
  private segment = -1;
  private layoutStyle: SafeStyle = {};
  private screenContextSubscription: Subscription | null = null;

  /** @ignore */
  @HostBinding('style')
  get style(): SafeStyle {
    return this.layoutStyle;
  }

  /**
   * Sets the target window segment to display this container on when multi
   * screen is detected.
   *
   * @param segment The target window segment, must be 0 or 1.
   */
  @Input()
  set fdWindow(segment: number | string) {
    segment = typeof segment === 'string' ? parseInt(segment, 10) : segment;
    if (segment !== this.segment) {
      this.segment = segment;
      this.updateStyle();
    }
  }

  constructor(
    private screenContext: ScreenContext,
    @Host() private splitLayout: SplitLayoutDirective
  ) {
    this.screenContextSubscription = this.screenContext
      .asObservable()
      .subscribe(() => this.updateStyle());
  }

  /** @ignore */
  ngOnDestroy() {
    if (this.screenContextSubscription !== null) {
      this.screenContextSubscription.unsubscribe();
    }
  }

  private updateStyle() {
    if (this.segment === -1) {
      return;
    }

    const isMultiScreen = this.screenContext.isMultiScreen;
    const spanning = this.screenContext.screenSpanning;

    if (isMultiScreen && spanning !== ScreenSpanning.None) {
      if (this.segment < 0 || this.segment > 1) {
        throw new Error('Segment index must be 0 or 1');
      }

      const mode = this.splitLayout.layoutMode;
      const order = this.splitLayout.windowOrder;
      const direction = this.splitLayout.readingDirection;
      // Swap segments for vertical span and RTL mode or
      // horizontal span and reverse window order
      const swap =
        (spanning === ScreenSpanning.DualHorizontal &&
          mode !== SplitLayoutMode.Grid &&
          direction === ReadingDirection.RightToLeft) ||
        (spanning === ScreenSpanning.DualVertical &&
          order === WindowOrder.Reverse);

      const segment = swap ? 1 - this.segment : this.segment;
      this.layoutStyle = layoutStyles[mode][spanning][segment];
    } else {
      this.layoutStyle = {};
    }
  }
}
