import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcCustomsComponent } from './calc-customs.component';

describe('CalcCustomsComponent', () => {
  let component: CalcCustomsComponent;
  let fixture: ComponentFixture<CalcCustomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcCustomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcCustomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
