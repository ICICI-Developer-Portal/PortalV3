import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardedMerchantDetailComponent } from './onboarded-merchant-detail.component';

describe('OnboardedMerchantDetailComponent', () => {
  let component: OnboardedMerchantDetailComponent;
  let fixture: ComponentFixture<OnboardedMerchantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardedMerchantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardedMerchantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
