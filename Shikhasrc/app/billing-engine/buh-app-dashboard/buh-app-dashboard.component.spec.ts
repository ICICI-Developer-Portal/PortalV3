import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuhAppDashboardComponent } from './buh-app-dashboard.component';

describe('BuhAppDashboardComponent', () => {
  let component: BuhAppDashboardComponent;
  let fixture: ComponentFixture<BuhAppDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuhAppDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuhAppDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
