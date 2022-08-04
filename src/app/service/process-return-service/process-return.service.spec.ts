import { TestBed } from '@angular/core/testing';

import { ProcessReturnService } from './process-return.service';

describe('ProcessReturnService', () => {
  let service: ProcessReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessReturnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
