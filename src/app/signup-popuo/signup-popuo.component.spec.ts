import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPopuoComponent } from './signup-popuo.component';

describe('SignupPopuoComponent', () => {
  let component: SignupPopuoComponent;
  let fixture: ComponentFixture<SignupPopuoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPopuoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPopuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
