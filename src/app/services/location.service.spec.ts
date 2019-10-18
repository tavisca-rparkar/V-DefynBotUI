import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[FormsModule,HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: LocationService = TestBed.get(LocationService);
    expect(service).toBeTruthy();
  });
});
