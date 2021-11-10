import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BESidebarComponent } from './besidebar.component';

describe('BESidebarComponent', () => {
  let component: BESidebarComponent;
  let fixture: ComponentFixture<BESidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BESidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BESidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
