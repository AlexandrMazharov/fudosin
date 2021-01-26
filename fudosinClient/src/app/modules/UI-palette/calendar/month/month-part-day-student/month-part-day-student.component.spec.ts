import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPartDayStudentComponent } from './month-part-day-student.component';

describe('MonthPartDayComponent', () => {
  let component: MonthPartDayStudentComponent;
  let fixture: ComponentFixture<MonthPartDayStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthPartDayStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPartDayStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
