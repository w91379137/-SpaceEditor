import { TestBed } from '@angular/core/testing';

import { PodcastCenterService } from './podcast-center.service';

describe('PodcastCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PodcastCenterService = TestBed.get(PodcastCenterService);
    expect(service).toBeTruthy();
  });
});
