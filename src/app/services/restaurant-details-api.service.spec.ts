import { TestBed } from '@angular/core/testing';

import { RestaurantDetailsApiService } from './restaurant-details-api.service';

describe('RestaurantDetailsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantDetailsApiService = TestBed.get(RestaurantDetailsApiService);
    expect(service).toBeTruthy();
  });
});
