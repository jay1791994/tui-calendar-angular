import { TestBed, inject } from '@angular/core/testing';

import { EventCaptureService } from './event-capture.service';

describe('EventCaptureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventCaptureService]
    });
  });

  it('should be created', inject([EventCaptureService], (service: EventCaptureService) => {
    expect(service).toBeTruthy();
  }));
});
