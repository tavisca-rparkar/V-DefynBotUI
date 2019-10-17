import { TestBed } from '@angular/core/testing';

import { MockableService } from './mockable.service';

describe('MockableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockableService = TestBed.get(MockableService);
    expect(service).toBeTruthy();
  });
});
