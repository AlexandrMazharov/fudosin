import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarYearComponent } from './calendar.year.component';

describe('TimetableYearComponent', () => {
  let component: CalendarYearComponent;
  let fixture: ComponentFixture<CalendarYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
