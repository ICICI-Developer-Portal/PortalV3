import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiyMerchantOnboardingComponent } from './diy-merchant-onboarding.component';

describe('DiyMerchantOnboardingComponent', () => {
  let component: DiyMerchantOnboardingComponent;
  let fixture: ComponentFixture<DiyMerchantOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiyMerchantOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiyMerchantOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
