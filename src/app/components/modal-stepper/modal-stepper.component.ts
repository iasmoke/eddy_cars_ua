import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-modal-stepper',
  templateUrl: './modal-stepper.component.html',
  styleUrls: ['./modal-stepper.component.scss']
})
export class ModalStepperComponent implements OnInit {

  mainForm: any = {};
  firstSubmit = false;
  firstError = false;

  constructor(
    public dialogRef: MatDialogRef<ModalStepperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceForms: FormsService
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    if (this.mainForm.contact) {
      this.firstSubmit = true;
      this.serviceForms.postMainForm(this.mainForm).subscribe();
    } else {
      console.log('error');
      this.firstError = true;
    }
  }

}
