import { TestBed } from '@angular/core/testing';

import { ClothingDataService } from './clothing-data.service';

describe('ClothingDataService', () => {
  let service: ClothingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClothingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
