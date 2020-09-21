import { NgModule } from '@angular/core';
import { SplitLayoutComponent } from './split-layout.component';
import { IfSpanningDirective } from './if-spanning.directive';
import { WindowDirective } from './window.directive';

@NgModule({
  declarations: [
    SplitLayoutComponent,
    IfSpanningDirective,
    WindowDirective
  ],
  imports: [
  ],
  exports: [SplitLayoutComponent]
})
export class FoldableModule { }
