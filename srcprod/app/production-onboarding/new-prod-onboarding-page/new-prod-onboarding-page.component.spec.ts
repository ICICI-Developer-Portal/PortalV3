import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProdOnboardingPageComponent } from './new-prod-onboarding-page.component';

describe('NewProdOnboardingPageComponent', () => {
  let component: NewProdOnboardingPageComponent;
  let fixture: ComponentFixture<NewProdOnboardingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProdOnboardingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProdOnboardingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
