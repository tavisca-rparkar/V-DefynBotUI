import { TestBed } from '@angular/core/testing';

import { RestaurantApiService } from './restaurant-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('RestaurantApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[FormsModule,HttpClientTestingModule]
  }));
  

  it('should be created', () => {
    const service: RestaurantApiService = TestBed.get(RestaurantApiService);
    expect(service).toBeTruthy();
  });
});
