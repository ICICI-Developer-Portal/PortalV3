import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingEngineComponent } from './billing-engine.component';

describe('BillingEngineComponent', () => {
  let component: BillingEngineComponent;
  let fixture: ComponentFixture<BillingEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
