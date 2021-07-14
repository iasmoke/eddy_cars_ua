import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval, of, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ModalCallComponent } from '../modal-call/modal-call.component';
import { ModalNoticeComponent } from '../modal-notice/modal-notice.component';
import { copart, iaai } from './landing.constants';
import { FormsService } from 'src/app/services/forms.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {

  RESULT_DATA = [
    {type: 'Пошлина',  base: '', rate: '', sum: '' },
    {type: 'Акциз',    base: '', rate: '', sum: '' },
    {type: 'НДС',      base: '', rate: '', sum: '' },
    {type: 'ВСЕГО',    base: '', rate: '', sum: '' }
  ];

  mainForm: any = {

  }

  auctions = [
    {
      text: 'Copart',
      value: 1
    },
    {
      text: 'IAAI',
      value: 2
    }
  ];

  auction = 1;

  engineTypes = [
    {
      text: 'Бензиновый',
      value: 1
    },
    {
      text: 'Дизельный',
      value: 2
    },
    {
      text: 'Электро',
      value: 3
    },
  ]

  cross: any = {
    eur: 33.4249,
    usd: 28.5074,
    pln: 7.3528
  };

  currencies = [
    'USD'
  ];

  displayedColumns: string[] = ['type', 'base', 'rate', 'sum'];
  dataSource = this.RESULT_DATA;

  yearsProd = [
    { value: 1, text: '2021' },
    { value: 1, text: '2020' },
    { value: 1, text: '2019' },
    { value: 2, text: '2018' },
    { value: 3, text: '2017' },
    { value: 4, text: '2016' },
    { value: 5, text: '2015' },
    { value: 6, text: '2014' },
    { value: 7, text: '2013' },
    { value: 8, text: '2012' },
    { value: 9, text: '2011' },
    { value: 10, text: '2010' },
    { value: 11, text: '2009' },
    { value: 12, text: '2008' },
    { value: 13, text: '2007' },
    { value: 14, text: '2006' },
    { value: 15, text: 'Старше' }
  ];

  amountn = 1598;
  costn = 0;
  yearn = 1;
  status = 2;
  maxWeight = 5;
  truckAge = 5;
  carType = 1;
  kvtch = 0;

  importer = 1;
  engineType = 1;
  currency = 'USD';
  certificate = 1;

  crossMessage = '';
  totalMessage = '';

  firstSubmit = false;
  firstError = false;

  copart: any = [];
  iaai: any = [];

  menu = [
    {
      text: 'Главная',
      link: 'services'
    },
    {
      text: 'Услуги',
      link: 'services'
    },
    {
      text: 'О компании',
      link: 'services'
    },
    {
      text: 'Отзывы',
      link: 'services'
    },
    {
      text: 'Контакты',
      link: 'services'
    },
  ];

  types = [
    'suv',
    'sedan'
  ];

  years = [
    2019,
    2020,
    2021
  ];

  service = [
    {
      img: 'service-img-5.svg',
      title: 'Подбор',
      text: [
        'Поиск лучших вариантов на аукционе под запрос клиента'
      ],
      fragment: 'podbor'
    },
    {
      img: 'service-img-7.svg',
      title: 'Проверка',
      text: ['Изучение истории, проверка продавца, экспертная оценка, исключение  возможных рисков'],
      fragment: 'proverka'
    },
    {
      img: 'service-img-4.svg',
      title: 'Покупка',
      text: ['Просчет стоимости лота и всей расходной части, участие и победа в торгах'],
      fragment: 'pokupka'
    },
    {
      img: 'service-img-2.svg',
      title: 'Доставка',
      text: [
        'Транспортировка на склад в США, фотоотчеты, подготовка необходимых документов, погрузка, отправка в Украину'
      ],
      fragment: 'dostavka'
    },
    {
      img: 'service-img-8.svg',
      title: 'Таможня',
      text: ['Разгрузка контейнера и таможенное оформление автомобиля клиента в кратчайшие сроки'],
      fragment: 'customs'
    },
    {
      img: 'service-img-1.svg',
      title: 'Ремонт',
      text: [
        'Подбор и доставка необходимых запчастей, организация процесса ремонта, контроль на всех этапах'
      ],
      fragment: 'remont'
    },
    {
      img: 'service-img-6.svg',
      title: 'Сертификация',
      text: [
        'Организация процесса сертификации в кратчайшие сроки и по выгодной цене'
      ],
      fragment: 'cert'
    },
    {
      img: 'service-img-3.svg',
      title: 'Постановка на учет',
      text: [
        'Регистрация транспортного средства клиента в сервисном центре и доставка в любую точку Украины'
      ],
      fragment: 'uchet'
    },
    {
      img: 'service-img-9.png',
      title: 'Авто в кредит',
      text: [
        'Возможность получения кредитных средств для покупки авто из США на срок до 7 лет'
      ],
      fragment: 'kredit'
    }
  ];

  lat = 21.3069;
  lng = -157.8583;
  mapType = 'satellite';
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  state = '';
  portPrice = 0;
  portText = '';

  counterOne = 5;
  counterTwo = 500;
  counterThree = 300;

  allInc = false;
  insurance = false;
  cert = false;
  uchet = false;

  showAfterCall = false;
  scrollPosition = 0;
  innerHeight = 0;

  volumes = [
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000
  ];

  screenFirst = false;
  screenSecond = false;

  @HostListener('window:scroll', ['$event'])
  scrollDetection() {
    this.scrollPosition = (window.pageYOffset + (window.innerHeight / 2));
    this.innerHeight = window.innerHeight;

    if (this.scrollPosition > 650) {
      this.screenSecond = true;
    }
    console.log(this.scrollPosition);
  }

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private serviceForms: FormsService
  ) {

    this.copart = copart;
    this.iaai = iaai;
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    interval(500).pipe(take(1), take(1)).subscribe(r => {
      this.screenFirst = true;
    });
  }

  startCounters() {

    let stop$: Subject<boolean> = new Subject();
    stop$.next(false);

    const one = 5;
    const two = 500;
    const three = 300;

    interval(3000 / one).pipe(take(1), takeUntil(stop$)).subscribe(r => {
      this.counterOne += 1;
      if (this.counterOne === one) {
        stop$.next(true);
      }
    });

    interval(3000 / two).pipe(take(1),takeUntil(stop$)).subscribe(r => {
      this.counterTwo += 1;
      if (this.counterTwo === two) {
        stop$.next(true);
      }
    });

    interval(3000 / three).pipe(take(1),takeUntil(stop$)).subscribe(r => {
      this.counterThree += 1;
      if (this.counterThree === three) {
        stop$.next(true);
      }
    });

  }

  getFreight(port: any) {
    switch (port) {
      case 'NJ':
        this.portPrice = 650;
        this.portText = '(Фрахт - NJ)';
        break;
      case 'GA':
        this.portPrice = 650;
        this.portText = '(Фрахт - GA)';
        break;
      case 'TX':
        this.portPrice = 700;
        this.portText = '(Фрахт - TX)';
        break;
      case 'CA':
        this.portPrice = 875;
        this.portText = '(Фрахт - CA)';
        break;
    }
  }

  getUnique(auction: number = this.copart) {

    const unique = (value: any, index: any, self: string | any[]) => {
      return self.indexOf(value) === index
    }

    let tmp = auction === 1 ? this.copart : this.iaai;
    return tmp.map((_: any) => _.port).filter(unique);
  }

  ngAfterViewInit(): void {

  }

  showDetails(mode = 1) {
    let text = '';
    if (mode === 1) {
      text = 'Стандартный комплекс услуг по подбору, покупке, доставке, таможенному оформлению приобретенного авто + сопровождение ремонта, подбор и доставка запчастей, прохождение сертификации, постановка на учет.';
    } else if (mode === 2) {
      text = 'Страхование авто от повреждений любого характера на всех этапах транспортировки.';
    } else if (mode === 3) {
      text = 'Включить в калькуляцию получение сертификата соответствия.';
    } else if (mode === 4) {
      text = 'Включить в калькуляцию Налог в Пенсионный фонд при регистрации ТС.';
    }
    const dialogRef = this.dialog.open(ModalNoticeComponent, {
      width: '610px',
      data: { text },
      scrollStrategy: new NoopScrollStrategy()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCallComponent, {
      width: '610px',
      data: {name: 'wer', animal: 'wer'},
      scrollStrategy: new NoopScrollStrategy()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  // легковые -- done
  calcCars() {
    try {
      let a = 0;
      let b = 0;
      let y: any = '';
      let c: any = 0;
      let cb = 0;
      let cbo: any = '';
      let cbo2: any = '';
      let aa2o: any = '';
      let cbocbo2: any = '';
      let cbocbo22: any = '';
      let sum: any = '';
      let sum2 = 0;
      let c2 = 0;
      let cur: any = '';


      // Объём двигателя
      a = this.amountn;

      // Стоимость авто
      b = this.costn;

      // Год производства
      y = this.yearn;

      let koef = 50;
      if (this.engineType === 1) {
        // Если бенз
        if (a <= 3000) {
          koef = 50;
        } else {
          koef = 100;
        }
      } else if (this.engineType === 2) {
        // Если дизель
        if (a <= 3500) {
          koef = 75;
        } else {
          koef = 150;
        }
      }

      c = this.cross[this.currency.toLowerCase()];
      cur = this.currency;

      c2 = this.cross.eur;

      cb = c * b;
      cbo = (c * b).toFixed(2);

      if (this.certificate === 2) {
        cbo2 = (cbo * 0.055).toFixed(2);
        this.RESULT_DATA.filter(row => row.type === 'Пошлина')[0].rate = '5.5%';
      } else {
        cbo2 = (cbo * 0.1).toFixed(2);
        this.RESULT_DATA.filter(row => row.type === 'Пошлина')[0].rate = '10%';
      };

      aa2o = (koef * (a / 1000) * y * c2).toFixed(2);

      cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(2);
      cbocbo22 = cbocbo2 * 0.2;

      sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22)).toFixed(2);

      this.RESULT_DATA.filter(row => row.type === 'Пошлина')[0].base = cbo + ' грн.';
      this.RESULT_DATA.filter(row => row.type === 'Пошлина')[0].sum = cbo2 + ' грн.';
      this.RESULT_DATA.filter(row => row.type === 'Акциз')[0].base = a.toFixed(2) + ' куб.см.';
      this.RESULT_DATA.filter(row => row.type === 'Акциз')[0].rate = y + 'х' + koef;
      this.RESULT_DATA.filter(row => row.type === 'Акциз')[0].sum = aa2o + ' грн.';
      this.RESULT_DATA.filter(row => row.type === 'НДС')[0].base = cbocbo2 + ' грн.';
      this.RESULT_DATA.filter(row => row.type === 'НДС')[0].rate = '20%';
      this.RESULT_DATA.filter(row => row.type === 'НДС')[0].sum = cbocbo22.toFixed(2) + ' грн.';
      this.RESULT_DATA.filter(row => row.type === 'ВСЕГО')[0].sum = sum + ' грн.';

      sum2 = sum / c;

      this.crossMessage = 'В расчёте использовался текущий курс НБУ - 1 ' + cur + ' = ' + c + ' грн. (НБУ)';
      this.totalMessage = 'Итого, на таможню нужно заплатить ' + sum2.toFixed(2) + ' ' + cur + ' по курсу НБУ на день оформления';

      console.log(this.RESULT_DATA);
    } catch(e) {
      console.log(e);
    }
  }

  submitForm() {
    if (this.mainForm.contact) {
      this.firstSubmit = true;
      this.serviceForms.postMainForm(this.mainForm).subscribe(_ => {
        console.log(_);
      })
    } else {
      console.log('error');
      this.firstError = true;
    }

  }
}
