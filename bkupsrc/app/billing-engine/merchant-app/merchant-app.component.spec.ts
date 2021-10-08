import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAppComponent } from './merchant-app.component';

describe('MerchantAppComponent', () => {
  let component: MerchantAppComponent;
  let fixture: ComponentFixture<MerchantAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
