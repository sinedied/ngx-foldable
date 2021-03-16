import {
  Directive,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ScreenContext } from './screen-context';
import { ScreenSpanning } from './screen-spanning';
import {
  SplitLayoutDirective,
  SplitLayoutMode,
} from './split-layout.directive';

/**
 * Look 'ma, CSS-in-JS with Angular! ಠ_ಠ
 *
 * @ignore
 */
const layoutStyles = {
  [SplitLayoutMode.Flex]: {
    [ScreenSpanning.Vertical]: [
      { flex: '0 1 env(fold-left)' },
      { flex: '0 1 calc(100vw - env(fold-right))' },
    ],
    [ScreenSpanning.Horizontal]: [
      { flex: '0 1 env(fold-top)' },
      { flex: '0 1 calc(100vh - env(fold-bottom))' },
    ],
  },
  [SplitLayoutMode.Grid]: {
    [ScreenSpanning.Vertical]: [
      { gridArea: 'segment0' },
      { gridArea: 'segment1' },
    ],
    [ScreenSpanning.Horizontal]: [
      { gridArea: 'segment0' },
      { gridArea: 'segment1' },
    ],
  },
  [SplitLayoutMode.Absolute]: {
    [ScreenSpanning.Vertical]: [
      {
        position: 'absolute',
        left: 0,
        right: 'calc(100vw - env(fold-left))',
      },
      {
        position: 'absolute',
        left: 'env(fold-right)',
        right: 0,
      },
    ],
    [ScreenSpanning.Horizontal]: [
      {
        position: 'absolute',
        top: 0,
        width: '100%',
        maxHeight: 'env(fold-top)',
      },
      {
        position: 'absolute',
        top: 'env(fold-bottom)',
        width: '100%',
        maxHeight: 'calc(100vh - env(fold-bottom))',
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
    private element: ElementRef,
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
      const direction = getComputedStyle(this.element.nativeElement)?.direction;
      // Swap segments for vertical span and RTL mode
      const segment =
        spanning === ScreenSpanning.Vertical && direction === 'rtl'
          ? 1 - this.segment
          : this.segment;

      this.layoutStyle = layoutStyles[mode][spanning][segment];
    } else {
      this.layoutStyle = {};
    }
  }
}
