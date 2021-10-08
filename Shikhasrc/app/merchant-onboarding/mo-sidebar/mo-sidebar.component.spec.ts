import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoSidebarComponent } from './mo-sidebar.component';

describe('MoSidebarComponent', () => {
  let component: MoSidebarComponent;
  let fixture: ComponentFixture<MoSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
