import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiyMerchantOnboardingRequestComponent } from './diy-merchant-onboarding-request.component';

describe('DiyMerchantOnboardingRequestComponent', () => {
  let component: DiyMerchantOnboardingRequestComponent;
  let fixture: ComponentFixture<DiyMerchantOnboardingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiyMerchantOnboardingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiyMerchantOnboardingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
