import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppathonSignupComponent } from './appathon-signup.component';

describe('AppathonSignupComponent', () => {
  let component: AppathonSignupComponent;
  let fixture: ComponentFixture<AppathonSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppathonSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppathonSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
