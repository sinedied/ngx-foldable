import { Directive, EmbeddedViewRef, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenContext } from './screen-context';
import { ScreenSpanning } from './screen-spanning';

// Pseudo enum type extension
export const SpanCondition = {
  ...ScreenSpanning,
  Multi: 'multi'
}
type SpanCondition = (typeof SpanCondition)[keyof typeof SpanCondition];

@Directive({
  selector: '[fdIfSpan]'
})
export class IfSpanDirective<T> implements OnDestroy {

  private screenContextSubscription: Subscription = null;
  private condition: SpanCondition;
  private thenTemplateRef: TemplateRef<T>|null = null;
  private elseTemplateRef: TemplateRef<T>|null = null;
  private thenViewRef: EmbeddedViewRef<T>|null = null;
  private elseViewRef: EmbeddedViewRef<T>|null = null;
  
  @Input()
  set fdIfSpan(condition: SpanCondition) {
    if (condition !== this.condition) {
      this.condition = condition;
      this.updateView();
    }
  }

  @Input()
  set fdIfSpanThen(templateRef: TemplateRef<T>|null) {
    this.thenTemplateRef = templateRef;
    this.thenViewRef = null;
    this.updateView();
  }

  @Input()
  set fdIfSpanElse(templateRef: TemplateRef<T>|null) {
    this.elseTemplateRef = templateRef;
    this.thenViewRef = null;
    this.updateView();
  }

  constructor(private screenContext: ScreenContext, private viewContainer: ViewContainerRef, templateRef: TemplateRef<T>) {
    this.thenTemplateRef = templateRef;
    this.screenContextSubscription = this.screenContext.asObservable().subscribe(() => this.updateView());
  }

  ngOnDestroy() {
    if (this.screenContextSubscription !== null) {
      this.screenContextSubscription.unsubscribe();
    }
  }

  private matchCondition(): boolean {
    switch (this.condition) {
      case SpanCondition.Multi:
        return this.screenContext.isMultiScreen;
      case SpanCondition.Horizontal:
        return this.screenContext.screenSpanning === ScreenSpanning.Horizontal;
      case SpanCondition.Vertical:
        return this.screenContext.screenSpanning === ScreenSpanning.Vertical;
      default:
        return this.screenContext.screenSpanning === ScreenSpanning.None;
    }
  }

  private updateView() {
    const match = this.matchCondition();
    if (match) {
      if (!this.thenViewRef) {
        this.viewContainer.clear();
        this.elseViewRef = null;
        if (this.thenTemplateRef) {
          this.thenViewRef = this.viewContainer.createEmbeddedView(this.thenTemplateRef);
        }
      }
    } else {
      if (!this.elseViewRef) {
        this.viewContainer.clear();
        this.thenViewRef = null;
        if (this.elseTemplateRef) {
          this.elseViewRef = this.viewContainer.createEmbeddedView(this.elseTemplateRef);
        }
      }
    }
  }

}
