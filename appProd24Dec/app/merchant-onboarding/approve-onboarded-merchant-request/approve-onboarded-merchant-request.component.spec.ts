import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOnboardedMerchantRequestComponent } from './approve-onboarded-merchant-request.component';

describe('ApproveOnboardedMerchantRequestComponent', () => {
  let component: ApproveOnboardedMerchantRequestComponent;
  let fixture: ComponentFixture<ApproveOnboardedMerchantRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveOnboardedMerchantRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOnboardedMerchantRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
