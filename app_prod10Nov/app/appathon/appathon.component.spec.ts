import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppathonComponent } from './appathon.component';

describe('AppathonComponent', () => {
  let component: AppathonComponent;
  let fixture: ComponentFixture<AppathonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppathonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppathonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
