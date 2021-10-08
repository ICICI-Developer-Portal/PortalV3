import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardedMerchantRequestComponent } from './onboarded-merchant-request.component';

describe('OnboardedMerchantRequestComponent', () => {
  let component: OnboardedMerchantRequestComponent;
  let fixture: ComponentFixture<OnboardedMerchantRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardedMerchantRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardedMerchantRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
