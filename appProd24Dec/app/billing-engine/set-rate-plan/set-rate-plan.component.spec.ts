import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRatePlanComponent } from './set-rate-plan.component';

describe('SetRatePlanComponent', () => {
  let component: SetRatePlanComponent;
  let fixture: ComponentFixture<SetRatePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRatePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRatePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
