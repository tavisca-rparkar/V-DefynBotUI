import { TestBed } from '@angular/core/testing';

import { MockableApiService } from './mockableApi.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MockableApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[FormsModule,HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: MockableApiService = TestBed.get(MockableApiService);
    expect(service).toBeTruthy();
  });
});
