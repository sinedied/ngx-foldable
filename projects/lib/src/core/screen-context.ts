import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, startWith, takeUntil } from 'rxjs/operators';
import { singleFoldHorizontal, singleFoldVertical } from './media-queries';
import { ScreenSpanning } from './screen-spanning';

declare global {
  interface Window {
    getWindowSegments: () => DOMRect[];
  }
}

/**
 * Holds information about the device screen context.
 */
export interface ScreenContextData {
  /** The list of available window segments. */
  readonly windowSegments: DOMRect[];
  /** The current screen spanning mode. */
  readonly screenSpanning: ScreenSpanning;
  /** True is current device have multiple screens available. */
  readonly isMultiScreen: boolean;
}

/**
 * This service allows to query and receive updates about current device's
 * screen context.
 *
 * See {@link ScreenContextData}
 */
@Injectable({
  providedIn: 'root',
})
export class ScreenContext implements ScreenContextData, OnDestroy {
  private currentContext: ScreenContextData;
  private mediaQuery = matchMedia(
    `${singleFoldHorizontal}, ${singleFoldVertical}`
  );
  private screenContext$: Observable<ScreenContextData>;
  private destroyed$: ReplaySubject<void> = new ReplaySubject(1);

  constructor() {
    this.currentContext = this.getScreenContext();
    this.screenContext$ = fromEvent(this.mediaQuery, 'change').pipe(
      startWith(1),
      map((_) => {
        this.currentContext = this.getScreenContext();
        return this.currentContext;
      }),
      shareReplay(1),
      takeUntil(this.destroyed$)
    );
    this.screenContext$.subscribe();
  }

  /** @ignored */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * The list of available window segments.
   */
  get windowSegments(): DOMRect[] {
    return this.currentContext.windowSegments;
  }

  /**
   * The current screen spanning mode.
   */
  get screenSpanning(): ScreenSpanning {
    return this.currentContext.screenSpanning;
  }

  /**
   * True is current device have multiple screens available.
   */
  get isMultiScreen(): boolean {
    return this.currentContext.isMultiScreen;
  }

  /**
   * Gets an observable emitting when the screen context changes.
   */
  asObservable(): Observable<ScreenContextData> {
    return this.screenContext$;
  }

  /**
   * Gets the current screen context.
   */
  asObject(): ScreenContextData {
    return this.currentContext;
  }

  private getScreenContext(): ScreenContextData {
    const windowSegments = this.getWindowSegments();
    const screenSpanning = this.getScreenSpanning();
    return {
      windowSegments,
      screenSpanning,
      isMultiScreen: screenSpanning !== ScreenSpanning.None,
    };
  }

  private getScreenSpanning(): ScreenSpanning {
    if (matchMedia(singleFoldHorizontal).matches) {
      return ScreenSpanning.Horizontal;
    } else if (matchMedia(singleFoldVertical).matches) {
      return ScreenSpanning.Vertical;
    }
    return ScreenSpanning.None;
  }

  private getWindowSegments(): DOMRect[] {
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
