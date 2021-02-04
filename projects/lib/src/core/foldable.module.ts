import { NgModule } from '@angular/core';
import { IfSpanDirective } from './if-span.directive';
import { WindowDirective } from './window.directive';
import { SplitLayoutDirective } from './split-layout.directive';

/**
 * This module contains utilities to help you build your app layout for multi screen devices.
 * 
 * See {@link SplitLayoutDirective},
 * {@link WindowDirective},
 * {@link IfSpanDirective},
 * {@link ScreenContext}
 */
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
