import { TestBed } from '@angular/core/testing';

import { NgxFoldableService } from './ngx-foldable.service';

describe('NgxFoldableService', () => {
  let service: NgxFoldableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFoldableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
