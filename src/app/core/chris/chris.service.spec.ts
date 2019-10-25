import { TestBed } from '@angular/core/testing';

import { ChrisService } from './chris.service';

xdescribe('ChrisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChrisService = TestBed.get(ChrisService);
    expect(service).toBeTruthy();
  });
});
