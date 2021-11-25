import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ScreenContext, ScreenContextData } from './screen-context';
import { ScreenSpanning } from './screen-spanning';
import { SplitLayoutDirective } from './split-layout.directive';

@Component({
  template: `<div fdSplitLayout="flex"></div>`,
})
class TestComponent {}

const getter = (obj: any, prop: string): jasmine.Spy =>
  Object.getOwnPropertyDescriptor(obj, prop)?.get as jasmine.Spy;

describe('SplitLayoutDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let screenContextSpy: jasmine.SpyObj<ScreenContext>;
  let fakeObservable$: Subject<ScreenContextData>;
  let el: DebugElement;

  beforeEach(() => {
    fakeObservable$ = new Subject<ScreenContextData>();
    screenContextSpy = jasmine.createSpyObj(
      'ScreenContext',
      ['asObservable', 'asObject'],
      ['isMultiScreen', 'screenSpanning', 'windowSegments']
    );
    screenContextSpy.asObservable.and.returnValue(fakeObservable$);
    getter(screenContextSpy, 'isMultiScreen').and.returnValue(false);
    getter(screenContextSpy, 'screenSpanning').and.returnValue(
      ScreenSpanning.None
    );

    fixture = TestBed.configureTestingModule({
      declarations: [SplitLayoutDirective, TestComponent],
      providers: [{ provide: ScreenContext, useValue: screenContextSpy }],
    }).createComponent(TestComponent);

    fakeObservable$.next();
    component = fixture.componentInstance;
  });

  it('should not add any css in single screen mode', () => {
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('div'));

    expect(el.nativeElement.getAttribute('style')).toBeNull();
  });

  it('should add styling in multi screen mode', () => {
    getter(screenContextSpy, 'isMultiScreen').and.returnValue(true);
    getter(screenContextSpy, 'screenSpanning').and.returnValue(
      ScreenSpanning.DualVertical
    );
    fakeObservable$.next();
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('[fdSplitLayout]'));

    expect(el.nativeElement.getAttribute('style')).not.toBeNull();
  });
});
