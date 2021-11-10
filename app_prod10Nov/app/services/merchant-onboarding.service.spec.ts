import { TestBed } from '@angular/core/testing';

import { MerchantOnboardingService } from './merchant-onboarding.service';

describe('MerchantOnboardingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantOnboardingService = TestBed.get(MerchantOnboardingService);
    expect(service).toBeTruthy();
  });
});
