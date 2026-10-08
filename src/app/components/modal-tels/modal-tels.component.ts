import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-tels',
  templateUrl: './modal-tels.component.html',
  styleUrls: ['./modal-tels.component.scss']
})
export class ModalTelsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalTelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
