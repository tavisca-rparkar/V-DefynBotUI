import { TestBed } from '@angular/core/testing';

import { DialogflowApiService } from './dialogflowApi.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DialogflowApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[FormsModule,HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: DialogflowApiService = TestBed.get(DialogflowApiService);
    expect(service).toBeTruthy();
  });
});
