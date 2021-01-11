import { TestBed } from '@angular/core/testing';

import { FormcontrolService } from './formcontrol.service';

describe('FormcontrolService', () => {
  let service: FormcontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormcontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
