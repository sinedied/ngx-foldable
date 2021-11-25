import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenContext } from './screen-context';
import { ScreenSpanning } from './screen-spanning';

/** Spanning mode conditions for use with {@link IfSpanDirective}. */
export type SpanCondition =
  | 'dual-horizontal'
  | 'dual-vertical'
  | 'none'
  | 'multi';
/**
 * Enumeration of spanning mode conditions values for use with
 * {@link IfSpanDirective}.
 */
export const SpanCondition = {
  /** Screen spanning mode is dual horizontal viewports. */
  Vertical: 'dual-horizontal' as SpanCondition,
  /** Screen spanning mode is dual vertical viewports. */
  Horizontal: 'dual-vertical' as SpanCondition,
  /** No screen spanning (single screen mode). */
  None: 'none' as SpanCondition,
  /** Any screen spanning mode is active (multi screen mode). */
  Multi: 'multi' as SpanCondition,
};

/**
 * Shows template only if the current screen spanning mode matches
 * specified {@link SpanCondition}.
 *
 * Behaves like `ngIf`, except that it accepts a {@link SpanCondition} instead of
 * a boolean expression.
 *
 * @example
 * <p *fdIdSpan="'multi'">This text will only be visible on multi screen devices.</p>
 * @example
 * <p *fdIdSpan="'none'; else alt">This text will only be visible on single screen devices.</p>
 * <ng-template #alt">This text will only be visible on multi screen devices.</ng-template>
 */
@Directive({
  selector: '[fdIfSpan]',
})
export class IfSpanDirective<T> implements OnDestroy {
  private screenContextSubscription: Subscription | null = null;
  private condition: SpanCondition | null = null;
  private thenTemplateRef: TemplateRef<T> | null = null;
  private elseTemplateRef: TemplateRef<T> | null = null;
  private thenViewRef: EmbeddedViewRef<T> | null = null;
  private elseViewRef: EmbeddedViewRef<T> | null = null;

  /**
   * The spanning mode condition that defines if the template should be shown.
   *
   * @param condition The spanning mode condition for showing the template.
   */
  @Input()
  set fdIfSpan(condition: SpanCondition) {
    if (condition !== this.condition) {
      this.condition = condition;
      this.updateView();
    }
  }

  /** A template to show if the span condition evaluates to true. */
  @Input()
  set fdIfSpanThen(templateRef: TemplateRef<T> | null) {
    this.thenTemplateRef = templateRef;
    this.thenViewRef = null;
    this.updateView();
  }

  /** A template to show if the span condition evaluates to false. */
  @Input()
  set fdIfSpanElse(templateRef: TemplateRef<T> | null) {
    this.elseTemplateRef = templateRef;
    this.thenViewRef = null;
    this.updateView();
  }

  constructor(
    private screenContext: ScreenContext,
    private viewContainer: ViewContainerRef,
    templateRef: TemplateRef<T>
  ) {
    this.thenTemplateRef = templateRef;
    this.screenContextSubscription = this.screenContext
      .asObservable()
      .subscribe(() => this.updateView());
  }

  /** ignore */
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
        return this.screenContext.screenSpanning === ScreenSpanning.DualVertical;
      case SpanCondition.Vertical:
        return this.screenContext.screenSpanning === ScreenSpanning.DualHorizontal;
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
          this.thenViewRef = this.viewContainer.createEmbeddedView(
            this.thenTemplateRef
          );
        }
      }
    } else {
      if (!this.elseViewRef) {
        this.viewContainer.clear();
        this.thenViewRef = null;
        if (this.elseTemplateRef) {
          this.elseViewRef = this.viewContainer.createEmbeddedView(
            this.elseTemplateRef
          );
        }
      }
    }
  }
}
