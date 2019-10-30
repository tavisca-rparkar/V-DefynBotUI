import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[FormsModule,HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });
});
