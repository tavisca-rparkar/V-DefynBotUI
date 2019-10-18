import { TestBed } from '@angular/core/testing';

import { MockableService } from './mockable.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MockableService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[FormsModule,HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: MockableService = TestBed.get(MockableService);
    expect(service).toBeTruthy();
  });
});
