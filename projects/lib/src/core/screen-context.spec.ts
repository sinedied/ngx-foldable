import { TestBed } from '@angular/core/testing';

import { ScreenContext } from './screen-context';

describe('NgxFoldableService', () => {
  let service: ScreenContext;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenContext);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
