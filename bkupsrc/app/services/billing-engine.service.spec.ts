import { TestBed } from '@angular/core/testing';


import { BillingEngineService } from './billing-engine.service';

describe('BillingEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillingEngineService = TestBed.get(BillingEngineService);
    expect(service).toBeTruthy();
  });
});
