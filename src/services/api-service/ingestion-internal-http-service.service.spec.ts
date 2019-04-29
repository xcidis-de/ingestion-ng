import { TestBed } from '@angular/core/testing';

import { IngestionInternalHttpServiceService } from './internal.http.service.service';

describe('IngestionInternalHttpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngestionInternalHttpServiceService = TestBed.get(IngestionInternalHttpServiceService);
    expect(service).toBeTruthy();
  });
});
