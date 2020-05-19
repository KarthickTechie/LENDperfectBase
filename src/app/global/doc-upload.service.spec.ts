import { TestBed } from '@angular/core/testing';

import { DocUploadService } from './doc-upload.service';

describe('DocUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocUploadService = TestBed.get(DocUploadService);
    expect(service).toBeTruthy();
  });
});
