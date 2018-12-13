import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventsComponent } from './events.component';

describe('EventsComponent', () => {
  let component: AdminEventsComponent;
  let fixture: ComponentFixture<AdminEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
