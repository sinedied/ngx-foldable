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
      { flex: '0 1 env(fold-left)' },
      { flex: '0 1 calc(100vw - env(fold-right))' }
    ],
    [ScreenSpanning.Horizontal]: [
      { flex: '0 1 env(fold-top)' },
      { flex: '0 1 calc(100vh - env(fold-bottom))' }
    ]
  },
  [SplitLayoutMode.Absolute]: {
    [ScreenSpanning.Vertical]: [
      { flex: '0 1 env(fold-left)' },
      { flex: '0 1 calc(100vw - env(fold-right))' }
    ],
    [ScreenSpanning.Horizontal]: [
      { flex: '0 1 env(fold-top)' },
      { flex: '0 1 calc(100vh - env(fold-bottom))' }
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
    const mode = this.splitLayout.layoutMode;
    const isMultiScreen = this.screenContext.isMultiScreen;
    const spanning = this.screenContext.screenSpanning;
    this.layoutStyle = isMultiScreen ? layoutStyles[mode][spanning][this.segment] : {};
  }

}
