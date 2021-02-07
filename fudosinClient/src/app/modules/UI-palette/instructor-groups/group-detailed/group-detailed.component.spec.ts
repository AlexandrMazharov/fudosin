import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailedComponent } from './group-detailed.component';

describe('GroupDetailedComponent', () => {
  let component: GroupDetailedComponent;
  let fixture: ComponentFixture<GroupDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
