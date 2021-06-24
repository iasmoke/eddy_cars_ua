import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcCarComponent } from './calc-car.component';

describe('CalcCarComponent', () => {
  let component: CalcCarComponent;
  let fixture: ComponentFixture<CalcCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
