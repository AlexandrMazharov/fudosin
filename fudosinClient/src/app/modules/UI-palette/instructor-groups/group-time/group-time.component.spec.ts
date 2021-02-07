import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTimeComponent } from './group-time.component';

describe('GroupTimeComponent', () => {
  let component: GroupTimeComponent;
  let fixture: ComponentFixture<GroupTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
