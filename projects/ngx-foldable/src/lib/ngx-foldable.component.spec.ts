import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFoldableComponent } from './ngx-foldable.component';

describe('NgxFoldableComponent', () => {
  let component: NgxFoldableComponent;
  let fixture: ComponentFixture<NgxFoldableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFoldableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFoldableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
