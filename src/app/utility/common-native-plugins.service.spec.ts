import { TestBed } from '@angular/core/testing';

import { CommonNativePluginsService } from './common-native-plugins.service';

describe('CommonNativePluginsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonNativePluginsService = TestBed.get(CommonNativePluginsService);
    expect(service).toBeTruthy();
  });
});
