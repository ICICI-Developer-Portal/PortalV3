import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppathonDashboardComponent } from './appathon-dashboard.component';

describe('AppathonDashboardComponent', () => {
  let component: AppathonDashboardComponent;
  let fixture: ComponentFixture<AppathonDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppathonDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppathonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
