import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayPartLessonComponent } from './day-part-lesson.component';

describe('DayPartLessonComponent', () => {
  let component: DayPartLessonComponent;
  let fixture: ComponentFixture<DayPartLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayPartLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayPartLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
