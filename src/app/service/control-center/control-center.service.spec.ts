import { TestBed } from '@angular/core/testing';

import { ControlCenterService } from './control-center.service';

describe('ControlCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlCenterService = TestBed.get(ControlCenterService);
    expect(service).toBeTruthy();
  });
});
