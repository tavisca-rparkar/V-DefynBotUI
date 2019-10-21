import { TestBed } from '@angular/core/testing';

import { LocationApiService } from './locationApi.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LocationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[FormsModule,HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: LocationApiService = TestBed.get(LocationApiService);
    expect(service).toBeTruthy();
  });
});
