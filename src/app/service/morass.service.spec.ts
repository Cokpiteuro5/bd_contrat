import { TestBed } from '@angular/core/testing';

import { MorassService } from './morass.service';

describe('MorassService', () => {
  let service: MorassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MorassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
