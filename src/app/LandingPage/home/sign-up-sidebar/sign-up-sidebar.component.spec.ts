import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSidebarComponent } from './sign-up-sidebar.component';

describe('SignUpSidebarComponent', () => {
  let component: SignUpSidebarComponent;
  let fixture: ComponentFixture<SignUpSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
