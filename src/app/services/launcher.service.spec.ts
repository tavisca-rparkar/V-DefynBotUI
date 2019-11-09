import { TestBed } from '@angular/core/testing';

import { LauncherService } from './launcher.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LauncherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]
  }));


  it('should be created', () => {
    const service: LauncherService = TestBed.get(LauncherService);
    expect(service).toBeTruthy();
  });
});
