import { TestBed } from '@angular/core/testing';

import { KeytextService } from './keytext.service';

describe('KeytextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeytextService = TestBed.get(KeytextService);
    expect(service).toBeTruthy();
  });
});
