import { TestBed } from '@angular/core/testing';

import { ClothesItemService } from './clothesItem.service';

describe('ClothesItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClothesItemService = TestBed.get(ClothesItemService);
    expect(service).toBeTruthy();
  });
});
