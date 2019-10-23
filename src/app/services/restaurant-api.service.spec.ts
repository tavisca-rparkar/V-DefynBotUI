import { TestBed } from '@angular/core/testing';

import { RestaurantApiService } from './restaurant-api.service';

describe('RestaurantApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantApiService = TestBed.get(RestaurantApiService);
    expect(service).toBeTruthy();
  });
});
