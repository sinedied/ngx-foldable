import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable, ReplaySubject } from 'rxjs';
import { map, tap, shareReplay, takeUntil } from 'rxjs/operators';
import { singleFoldHorizontal, singleFoldVertical } from './media-queries';
import { ScreenSpanning } from './screen-spanning';

declare global {
  interface Window {
    getWindowSegments: () => DOMRect[];
  }
}

export class ScreenContextData {
  readonly windowSegments: DOMRect[];
  readonly screenSpanning: ScreenSpanning;
  readonly isMultiScreen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScreenContext implements ScreenContextData, OnDestroy {

  private currentContext: ScreenContextData;
  private mediaQuery = matchMedia(`${singleFoldHorizontal}, ${singleFoldVertical}`);
  private screenContext$: Observable<ScreenContextData>;
  private destroyed$: ReplaySubject<void> = new ReplaySubject(1);

  constructor() {
    this.screenContext$ = fromEvent(this.mediaQuery, 'change').pipe(
      map(_ => this.getScreenContext()),
      tap(() => {
        this.currentContext = this.getScreenContext();
      }),
      shareReplay(1),
      takeUntil(this.destroyed$)
    );
    this.screenContext$.subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  
  get windowSegments(): DOMRect[] {
    return this.currentContext.windowSegments;
  }

  get screenSpanning(): ScreenSpanning {
    return this.currentContext.screenSpanning;
  }

  get isMultiScreen(): boolean {
    return this.currentContext.isMultiScreen;
  }

  asObservable(): Observable<ScreenContextData> {
    return this.screenContext$;
  }

  private getScreenContext(): ScreenContextData {
    const windowSegments = this.getWindowSegments();
    const screenSpanning = this.getScreenSpanning();
    return {
      windowSegments,
      screenSpanning,
      isMultiScreen: screenSpanning !== ScreenSpanning.None
    };
  }

  private getScreenSpanning(): ScreenSpanning {
    if (matchMedia(singleFoldHorizontal).matches) {
      return ScreenSpanning.Horizontal;
    } else if (matchMedia(singleFoldVertical)) {
      return ScreenSpanning.Vertical;
    }
    return ScreenSpanning.None;
  }

  private getWindowSegments() {
    if (!('getWindowSegments' in window)) {
      return [
        new DOMRect(
          window.pageXOffset,
          window.pageYOffset,
          window.innerWidth,
          window.innerHeight
        ),
      ];
    }
    return window.getWindowSegments();
  }
}
