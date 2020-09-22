import { NgModule } from '@angular/core';
import { IfSpanDirective } from './if-span.directive';
import { WindowDirective } from './window.directive';
import { SplitLayoutDirective } from './split-layout.directive';

@NgModule({
  declarations: [
    IfSpanDirective,
    WindowDirective,
    SplitLayoutDirective
  ],
  exports: [
    IfSpanDirective,
    WindowDirective,
    SplitLayoutDirective
  ]
})
export class FoldableModule { }
