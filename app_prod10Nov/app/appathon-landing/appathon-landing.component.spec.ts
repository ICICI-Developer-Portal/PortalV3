import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppathonLandingComponent } from './appathon-landing.component';

describe('AppathonLandingComponent', () => {
  let component: AppathonLandingComponent;
  let fixture: ComponentFixture<AppathonLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppathonLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppathonLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
