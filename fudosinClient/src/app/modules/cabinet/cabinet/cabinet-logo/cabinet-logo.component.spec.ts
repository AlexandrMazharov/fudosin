import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetLogoComponent } from './cabinet-logo.component';

describe('CabinetLogoComponent', () => {
  let component: CabinetLogoComponent;
  let fixture: ComponentFixture<CabinetLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
