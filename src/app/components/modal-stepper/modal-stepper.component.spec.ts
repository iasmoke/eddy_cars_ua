import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStepperComponent } from './modal-stepper.component';

describe('ModalStepperComponent', () => {
  let component: ModalStepperComponent;
  let fixture: ComponentFixture<ModalStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
