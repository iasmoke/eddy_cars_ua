import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTelsComponent } from './modal-tels.component';

describe('ModalTelsComponent', () => {
  let component: ModalTelsComponent;
  let fixture: ComponentFixture<ModalTelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
