import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUatonboardingPageComponent } from './new-uatonboarding-page.component';

describe('NewUatonboardingPageComponent', () => {
  let component: NewUatonboardingPageComponent;
  let fixture: ComponentFixture<NewUatonboardingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUatonboardingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUatonboardingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
