import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { IfSpanDirective, SpanCondition } from './if-span.directive';
import { ScreenContext, ScreenContextData } from './screen-context';
import { ScreenSpanning } from './screen-spanning';

@Component({
  selector: 'test',
  template: `<div *fdIfSpan="condition">visible</div>`,
})
class TestComponent {
  condition = SpanCondition.None;
}

const getter = (obj, prop): jasmine.Spy =>
  Object.getOwnPropertyDescriptor(obj, prop).get as jasmine.Spy;

describe('IfSpanDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let screenContextSpy: jasmine.SpyObj<ScreenContext>;
  let el: DebugElement;

  beforeEach(() => {
    const fakeObservable$ = new Subject<ScreenContextData>();
    screenContextSpy = jasmine.createSpyObj(
      'ScreenContext',
      ['asObservable', 'asObject'],
      ['isMultiScreen', 'screenSpanning', 'windowSegments']
    );
    screenContextSpy.asObservable.and.returnValue(fakeObservable$);
    getter(screenContextSpy, 'isMultiScreen').and.returnValue(false);
    getter(screenContextSpy, 'screenSpanning').and.returnValue(ScreenSpanning.None);

    fixture = TestBed.configureTestingModule({
      declarations: [IfSpanDirective, TestComponent],
      providers: [{ provide: ScreenContext, useValue: screenContextSpy }],
    }).createComponent(TestComponent);

    component = fixture.componentInstance;
  });

  describe('condition None', () => {
    it('should make el visible on single screen mode', () => {
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('div'));

      expect(el).not.toBeNull();
    });

    it('should make el invisible on multi screen mode', () => {
      getter(screenContextSpy, 'isMultiScreen').and.returnValue(true);
      getter(screenContextSpy, 'screenSpanning').and.returnValue(ScreenSpanning.Vertical);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('div'));
  
      expect(el).toBeNull();
    });
  });

  describe('condition Multi', () => {
    beforeEach(() => {
      component.condition = SpanCondition.Multi;
      getter(screenContextSpy, 'screenSpanning').and.returnValue(ScreenSpanning.Horizontal);
    });

    it('should make el visible on multi screen mode', () => {
      getter(screenContextSpy, 'isMultiScreen').and.returnValue(true);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('div'));

      expect(el).not.toBeNull();
    });

    it('should make el invisible on single screen mode', () => {
      getter(screenContextSpy, 'isMultiScreen').and.returnValue(false);
      getter(screenContextSpy, 'screenSpanning').and.returnValue(ScreenSpanning.None);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('div'));

      expect(el).toBeNull();
    });
  });

  describe('condition Horizontal', () => {
    beforeEach(() => {
      component.condition = SpanCondition.Horizontal;
      getter(screenContextSpy, 'isMultiScreen').and.returnValue(true);
    });

    it('should make el visible on horizontal span mode', () => {
      getter(screenContextSpy, 'screenSpanning').and.returnValue(ScreenSpanning.Horizontal);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('div'));

      expect(el).not.toBeNull();
    });

    it('should make el invisible on vertical span mode', () => {
      getter(screenContextSpy, 'screenSpanning').and.returnValue(ScreenSpanning.Vertical);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('div'));

      expect(el).toBeNull();
    });

    it('should make el invisible on single screen mode', () => {
      getter(screenContextSpy, 'isMultiScreen').and.returnValue(false);
      getter(screenContextSpy, 'screenSpanning').and.returnValue(ScreenSpanning.None);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('div'));

      expect(el).toBeNull();
    });
  });

  describe('condition Vertical', () => {
    beforeEach(() => {
      component.condition = SpanCondition.Vertical;
      getter(screenContextSpy, 'isMultiScreen').and.returnValue(true);
    });

    it('should make el invisible on horizontal span mode', () => {
      getter(screenContextSpy, 'screenSpanning').and.returnValue(ScreenSpanning.Horizontal);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('div'));

      expect(el).toBeNull();
    });

    it('should make el visible on vertical span mode', () => {
      getter(screenContextSpy, 'screenSpanning').and.returnValue(ScreenSpanning.Vertical);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('div'));

      expect(el).not.toBeNull();
    });

    it('should make el invisible on single screen mode', () => {
      getter(screenContextSpy, 'isMultiScreen').and.returnValue(false);
      getter(screenContextSpy, 'screenSpanning').and.returnValue(ScreenSpanning.None);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('div'));

      expect(el).toBeNull();
    });
  });
});
