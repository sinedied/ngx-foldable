import { Directive, HostBinding, Input, OnDestroy } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ScreenContext } from './screen-context';
import { ScreenSpanning } from './screen-spanning';

/**
 * Defines how the split layout container should be rendered when multi screen
 * is detected.
 */
export enum SplitLayoutMode {
  Flex = 'flex',
  Grid = 'grid',
  Absolute = 'absolute'
}

/**
 * Look 'ma, CSS-in-JS with Angular! ಠ_ಠ 
 * @ignore 
 */
const layoutStyles = {
  [SplitLayoutMode.Flex]: {
    common: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%'
    },
    [ScreenSpanning.Vertical]: {
      flexDirection: 'row'
    },
    [ScreenSpanning.Horizontal]: {
      flexDirection: 'column'
    }
  },
  [SplitLayoutMode.Grid]: {
    common: {
      display: 'grid',
      height: '100%'
    },
    [ScreenSpanning.Vertical]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: '"segment0 segment1"',
      gridAutoFlow: 'row',
      columnGap: 'env(fold-width)'
    },
    [ScreenSpanning.Horizontal]: {
      gridTemplateRows: '1fr 1fr',
      gridTemplateAreas: '"segment0" "segment1"',
      gridAutoFlow: 'row',
      rowGap: 'env(fold-height)'
    }
  },
  [SplitLayoutMode.Absolute]: {
    common: {
      position: 'relative',
      height: '100%'
    }
  }
};

/**
 * Defines a parent layout container for creating a split layout on multi screen devices.
 * 
 * When used on a single screen device, no layout change (CSS) is added.
 * You can choose between different {@link SplitLayoutMode} to suit your design.
 * 
 * This directive should be used along with {@link WindowDirective}.
 *  
 * @example
 * <div fdSplitLayout="grid">
 *              <section fdWindow="0">Will be displayed on first screen</section>
 *              <section fdWindow="1">Will be displayed on second screen (if available)</section>
 * </div>
 */
@Directive({
  selector: '[fdSplitLayout]'
})
export class SplitLayoutDirective implements OnDestroy {
  
  private mode: SplitLayoutMode = SplitLayoutMode.Flex;
  private layoutStyle: SafeStyle;
  private screenContextSubscription: Subscription = null;

  /**
   * Sets the current split layout mode to use when multi screen is detected.
   * @param {SplitLayoutMode} mode The split layout mode to use.
   */
  @Input()
  set fdSplitLayout(mode: SplitLayoutMode) {
    this.mode = mode || SplitLayoutMode.Flex;
    this.updateStyle();
  }

  /** @ignore */
  @HostBinding('style')
  get style(): SafeStyle {
    return this.layoutStyle;
  }

  constructor(private screenContext: ScreenContext) {
    this.updateStyle();
    this.screenContextSubscription = this.screenContext.asObservable().pipe(skip(1)).subscribe(() => this.updateStyle());
  }

  /**
   * The current split layout mode to use when multi screen is detected.
   * @return {SplitLayoutMode} The current split layout mode.
   */
  get layoutMode(): SplitLayoutMode {
    return this.mode;
  }

  /** @ignore */
  ngOnDestroy() {
    if (this.screenContextSubscription !== null) {
      this.screenContextSubscription.unsubscribe();
    }
  }

  private updateStyle() {
    const isMultiScreen = this.screenContext.isMultiScreen;
    if (isMultiScreen) {
      const spanning = this.screenContext.screenSpanning;
      this.layoutStyle = {
        ...layoutStyles[this.mode].common,
        ...layoutStyles[this.mode][spanning]
      }
    } else {
      this.layoutStyle = {};
    }
  }

}
