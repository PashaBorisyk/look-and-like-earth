import { TestBed } from '@angular/core/testing';

import { LookItemService } from './look-item.service';

describe('LookItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LookItemService = TestBed.get(LookItemService);
    expect(service).toBeTruthy();
  });
});
