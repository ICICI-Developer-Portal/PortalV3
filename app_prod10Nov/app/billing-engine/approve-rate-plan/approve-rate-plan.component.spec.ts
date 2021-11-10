import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRatePlanComponent } from './approve-rate-plan.component';

describe('ApproveRatePlanComponent', () => {
  let component: ApproveRatePlanComponent;
  let fixture: ComponentFixture<ApproveRatePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRatePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRatePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
