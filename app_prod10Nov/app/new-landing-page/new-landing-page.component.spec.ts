import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLandingPageComponent } from './new-landing-page.component';

describe('NewLandingPageComponent', () => {
  let component: NewLandingPageComponent;
  let fixture: ComponentFixture<NewLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
