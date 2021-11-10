import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiyOnboardingRequestComponent } from './diy-onboarding-request.component';

describe('DiyOnboardingRequestComponent', () => {
  let component: DiyOnboardingRequestComponent;
  let fixture: ComponentFixture<DiyOnboardingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiyOnboardingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiyOnboardingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
