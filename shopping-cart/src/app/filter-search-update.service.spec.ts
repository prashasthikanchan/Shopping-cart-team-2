import { TestBed } from '@angular/core/testing';

import { FilterSearchUpdateService } from './filter-search-update.service';

describe('FilterSearchUpdateService', () => {
  let service: FilterSearchUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSearchUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
