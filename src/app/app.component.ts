import { Component, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalCallComponent } from './components/modal-call/modal-call.component';
import { ModalTelsComponent } from './components/modal-tels/modal-tels.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eddycars';

  scrollPosition = 0;

  menu = [
    {
      text: 'Главная',
      link: '/',
      children: []
    },
    {
      text: 'Услуги',
      link: 'services',
      children: []
    },
    {
      text: 'Калькуляторы',
      link: '',
      children: [
        {
          text: 'Калькулятор под ключ',
          link: 'calc-all-inclusive'
        },
        {
          text: 'Калькулятор доставки',
          link: 'calc-delivery'
        },
        {
          text: 'Калькулятор таможенных платежей',
          link: 'calc-customs'
        }
      ]
    },
    {
      text: 'О компании',
      link: 'about',
      children: []
    },
    {
      text: 'Аукцион',
      link: '/',
      children: []
    },
    {
      text: 'Отзывы',
      link: '/',
      children: []
    }
  ];

  @HostListener('window:scroll', ['$event'])
  scrollDetection(e: any) {
    this.scrollPosition = window.pageYOffset;
    // console.log(this.scrollPosition);
  }

  constructor(
    public dialog: MatDialog
  ) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCallComponent, {
      width: '610px',
      data: {name: 'wer', animal: 'wer'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openTel(): void {
    const dialogRef = this.dialog.open(ModalTelsComponent, {
      width: 'auto',
      data: {name: 'wer', animal: 'wer'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}


