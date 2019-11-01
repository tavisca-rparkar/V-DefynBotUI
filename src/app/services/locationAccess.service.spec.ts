import { TestBed } from '@angular/core/testing';

import { LocationAccessService } from './locationAccess.service';

describe('LocationAccessServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationAccessService = TestBed.get(LocationAccessService);
    expect(service).toBeTruthy();
  });
});
