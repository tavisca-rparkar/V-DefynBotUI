import { TestBed } from '@angular/core/testing';

import { LauncherService } from './launcher.service';

describe('LauncherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LauncherService = TestBed.get(LauncherService);
    expect(service).toBeTruthy();
  });
});
