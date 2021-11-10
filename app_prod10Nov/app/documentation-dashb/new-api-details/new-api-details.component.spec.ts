import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApiDetailsComponent } from './new-api-details.component';

describe('NewApiDetailsComponent', () => {
  let component: NewApiDetailsComponent;
  let fixture: ComponentFixture<NewApiDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApiDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
