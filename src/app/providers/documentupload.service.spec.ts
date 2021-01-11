import { TestBed } from '@angular/core/testing';

import { DocumentuploadService } from './documentupload.service';

describe('DocumentuploadService', () => {
  let service: DocumentuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
