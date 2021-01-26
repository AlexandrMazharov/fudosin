import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendYearComponent } from './attend-year.component';

describe('TimetableYearComponent', () => {
  let component: AttendYearComponent;
  let fixture: ComponentFixture<AttendYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
