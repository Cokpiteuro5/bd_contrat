import { TestBed } from '@angular/core/testing';

import { MettreService } from './mettre.service';

describe('MettreService', () => {
  let service: MettreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MettreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
