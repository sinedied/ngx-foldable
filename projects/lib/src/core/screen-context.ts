import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenSpanning } from './screen-spanning';

export class ScreenContextData {
  readonly windowSegments?: DOMRect[];
  readonly screenSpanning: ScreenSpanning;
  readonly isMultiScreen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScreenContext extends ScreenContextData implements OnDestroy {

  private currentScreenContext: ScreenContext;

  readonly asObservable$: Observable<ScreenContext>;

  constructor() {
    super();
  }

  asObservable(): Observable<ScreenContextData> {
    return null;
  }

  ngOnDestroy() {

  }

  private getScreenContext
}
