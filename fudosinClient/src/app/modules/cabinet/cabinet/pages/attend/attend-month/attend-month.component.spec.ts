import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendMonthComponent } from './attend-month.component';

describe('TimetableMonthComponent', () => {
  let component: AttendMonthComponent;
  let fixture: ComponentFixture<AttendMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
