import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOnboardingPageComponent } from './merchant-onboarding-page.component';

describe('MerchantOnboardingPageComponent', () => {
  let component: MerchantOnboardingPageComponent;
  let fixture: ComponentFixture<MerchantOnboardingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantOnboardingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantOnboardingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
