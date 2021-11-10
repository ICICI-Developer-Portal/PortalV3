import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticPageComponent } from './analytic-page.component';

describe('AnalyticPageComponent', () => {
  let component: AnalyticPageComponent;
  let fixture: ComponentFixture<AnalyticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
