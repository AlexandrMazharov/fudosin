import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPartDayComponent } from './month-part-day.component';

describe('MonthPartDayComponent', () => {
  let component: MonthPartDayComponent;
  let fixture: ComponentFixture<MonthPartDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthPartDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPartDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
