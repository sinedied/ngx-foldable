import { Directive, Host, HostBinding, Input } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ScreenContext } from './screen-context';
import { ScreenSpanning } from './screen-spanning';
import { SplitLayoutDirective, SplitLayoutMode } from './split-layout.directive';

// Look 'ma, CSS-in-JS with Angular! ಠ_ಠ
const layoutStyles = {
  [SplitLayoutMode.Flex]: {
    [ScreenSpanning.Vertical]: [
      { flex: '0 1 env(fold-left)' },
      { flex: '0 1 calc(100vw - env(fold-right))' }
    ],
    [ScreenSpanning.Horizontal]: [
      { flex: '0 1 env(fold-top)' },
      { flex: '0 1 calc(100vh - env(fold-bottom))' }
    ]
  },
  [SplitLayoutMode.Grid]: {
    [ScreenSpanning.Vertical]: [
      { gridArea: 'segment0' },
      { gridArea: 'segment1' },
    ],
    [ScreenSpanning.Horizontal]: [
      { gridArea: 'segment0' },
      { gridArea: 'segment1' },
    ]
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
        right: 0
      }
    ],
    [ScreenSpanning.Horizontal]: [
      {
        position: 'absolute',
        top: 0,
        width: '100%',
        maxHeight: 'env(fold-top)'
      },
      {
        position: 'absolute',
        top: 'env(fold-bottom)',
        width: '100%',
        maxHeight: 'calc(100vh - env(fold-bottom))'
      }
    ]
  }
};

@Directive({
  selector: '[fdWindow]'
})
export class WindowDirective {

  private segment: number = -1;
  private layoutStyle: SafeStyle;
  private screenContextSubscription: Subscription = null;

  @HostBinding('style')
  get style(): SafeStyle {
    return this.layoutStyle;
  }

  @Input()
  set fdWindow(segment: number) {
    this.segment = segment;
    this.updateStyle();
  }

  constructor(private screenContext: ScreenContext, @Host() private splitLayout: SplitLayoutDirective) {
    this.screenContextSubscription = this.screenContext.asObservable().pipe(skip(1)).subscribe(() => this.updateStyle());
  }

  ngOnDestroy() {
    if (this.screenContextSubscription !== null) {
      this.screenContextSubscription.unsubscribe();
    }
  }

  private updateStyle() {
    const isMultiScreen = this.screenContext.isMultiScreen;

    if (isMultiScreen) {
      const mode = this.splitLayout.layoutMode;
      const spanning = this.screenContext.screenSpanning;
      this.layoutStyle = layoutStyles[mode][spanning][this.segment];
    } else {
      this.layoutStyle = {};
    }
  }

}
