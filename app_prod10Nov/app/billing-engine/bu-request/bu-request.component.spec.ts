import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuRequestComponent } from './bu-request.component';

describe('BuRequestComponent', () => {
  let component: BuRequestComponent;
  let fixture: ComponentFixture<BuRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
