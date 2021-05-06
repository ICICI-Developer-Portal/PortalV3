import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreApiSigninComponent } from './explore-api-signin.component';

describe('ExploreApiSigninComponent', () => {
  let component: ExploreApiSigninComponent;
  let fixture: ComponentFixture<ExploreApiSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreApiSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreApiSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
