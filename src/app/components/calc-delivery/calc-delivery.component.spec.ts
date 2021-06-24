import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcDeliveryComponent } from './calc-delivery.component';

describe('CalcDeliveryComponent', () => {
  let component: CalcDeliveryComponent;
  let fixture: ComponentFixture<CalcDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
