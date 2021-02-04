import { Component } from '@angular/core';
import { ScreenContext } from 'ngx-foldable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  screenContext$ = this.screenContext.asObservable();

  constructor(private screenContext: ScreenContext) {}

}
