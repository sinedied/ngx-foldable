import { NgModule } from '@angular/core';
import { SplitLayoutComponent } from './split-layout.component';
import { IfSpanDirective } from './if-span.directive';
import { WindowDirective } from './window.directive';

@NgModule({
  declarations: [
    SplitLayoutComponent,
    IfSpanDirective,
    WindowDirective
  ],
  imports: [
  ],
  exports: [SplitLayoutComponent]
})
export class FoldableModule { }
