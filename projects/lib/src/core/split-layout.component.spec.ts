import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitLayoutComponent } from './split-layout.component';

describe('SplitLayout', () => {
  let component: SplitLayoutComponent;
  let fixture: ComponentFixture<SplitLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
