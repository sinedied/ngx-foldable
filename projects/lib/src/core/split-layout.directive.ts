import { Directive, HostBinding, Input, OnDestroy } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ScreenContext } from './screen-context';
import { ScreenSpanning } from './screen-spanning';

export enum SplitLayoutMode {
  Flex = 'flex',
  Grid = 'grid',
  Absolute = 'absolute'
}

// Look 'ma, CSS-in-JS with Angular! ಠ_ಠ
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
    }
  },
  [SplitLayoutMode.Absolute]: {
    common: {
      position: 'relative',
      height: '100%'
    }
  }
};

@Directive({
  selector: '[fdSplitLayout]'
})
export class SplitLayoutDirective implements OnDestroy {
  
  private mode: SplitLayoutMode = SplitLayoutMode.Flex;
  private layoutStyle: SafeStyle;
  private screenContextSubscription: Subscription = null;

  @Input()
  set fdSplitLayout(mode: SplitLayoutMode) {
    this.mode = mode || SplitLayoutMode.Flex;
    this.updateStyle();
  }

  @HostBinding('style')
  get style(): SafeStyle {
    return this.layoutStyle;
  }

  constructor(private screenContext: ScreenContext) {
    this.updateStyle();
    this.screenContextSubscription = this.screenContext.asObservable().pipe(skip(1)).subscribe(() => this.updateStyle());
  }

  get layoutMode(): SplitLayoutMode {
    return this.mode;
  }

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
