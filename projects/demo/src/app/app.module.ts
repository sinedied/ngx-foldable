import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FoldableModule } from 'ngx-foldable';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FoldableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
