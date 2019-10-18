import { TestBed } from '@angular/core/testing';

import { DialogflowService } from './dialogflow.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DialogflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[FormsModule,HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: DialogflowService = TestBed.get(DialogflowService);
    expect(service).toBeTruthy();
  });
});
