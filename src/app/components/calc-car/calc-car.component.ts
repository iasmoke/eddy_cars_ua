import { Component, OnInit } from '@angular/core';
import { copart, iaai } from './calc-car.constants';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ModalNoticeComponent } from '../modal-notice/modal-notice.component';
import Big from 'big.js';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-calc-car',
  templateUrl: './calc-car.component.html',
  styleUrls: ['./calc-car.component.scss'],
})
export class CalcCarComponent implements OnInit {
  RESULT_DATA = [
    { type: 'Пошлина', base: '', rate: '', sum: '' },
    { type: 'Акциз', base: '', rate: '', sum: '' },
    { type: 'НДС', base: '', rate: '', sum: '' },
    { type: 'ВСЕГО', base: '', rate: '', sum: '' },
  ];

  copart: any = [];
  iaai: any = [];

  auctions = [
    {
      text: 'Copart',
      value: 1,
    },
    {
      text: 'IAAI',
      value: 2,
    },
  ];

  auction = 1;

  engineTypes = [
    {
      text: 'Бензиновый',
      value: 1,
    },
    {
      text: 'Дизельный',
      value: 2,
    },
    {
      text: 'Электро',
      value: 3,
    },
  ];

  // cross: any = {
  //   eur: 33.4249,
  //   usd: 28.5074,
  //   pln: 7.3528
  // };

  cross: any = {
    eur: 1,
    usd: 1,
    pln: 1,
  };

  currencies = ['USD'];

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
    { value: 15, text: 'Старше' },
  ];

  amountn = 1598;
  costn = 5000;
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

  // volumes = [1000, 1100, 1200, 12000, 3000, 4000, 5000, 6000, 7000, 8000];
  volumes = (new Array(110).fill(null).map((k,v)=> {
    return {
      text: +Big(v).times(100).div(1000),
      value: +Big(v).times(100)
    }
   })).splice(10,100);

  years = [2019, 2020, 2021];

  portPrice = 0;
  portText = '';
  state = '';

  allInc = false;
  insurance = false;
  cert = false;
  uchet = false;
  repair!: string;
  company_services: number = 0;
  fuel_basic_excise: any = 0;
  auction_fee: number = 0;
  insuranceCost: number = 0;
  overland_delivery_price: any;
  sea_port: any;
  certification: number = 0;
  customs_broker: number = 0;
  car_transporter: number = 0;
  brokerage: any = 0;
  delivery_price: any = 0;
  customs_duty: number = 0;
  excise: number = 0;
  nds: number = 0;
  brokers_pay: any = 0;
  first_registration: number = 0;
  summary_price: any = 0;
  showMoreOne = false;
  showMoreTwo = false;

  constructor(public dialog: MatDialog) {
    this.copart = copart;
    this.iaai = iaai;
  }

  ngOnInit(): void { }

  getFreight(port: any) {
    switch (port) {
      case 'NJ':
        this.portPrice = 650 + 125;
        this.portText = '(Фрахт - NJ)';
        break;
      case 'GA':
        this.portPrice = 650 + 125;
        this.portText = '(Фрахт - GA)';
        break;
      case 'TX':
        this.portPrice = 700 + 125;
        this.portText = '(Фрахт - TX)';
        break;
      case 'CA':
        this.portPrice = 875 + 125;
        this.portText = '(Фрахт - CA)';
        break;
    }
  }

  getUnique(arr: any) {
    const unique = (value: any, index: any, self: string | any[]) => {
      return self.indexOf(value) === index;
    };
    return arr.map((_: any) => _.location).filter(unique);
  }

  twoFixed(value: any) {
    return value > 0 ? +Big(value).toFixed(0) : value;
  }

  bigSum(arr: any) {
    return arr.reduce((a: any, c: any) => +Big(a).plus(c));
  }

  calcCarsNew() {
    this.customs_broker = 750; // таможенный брокер
    this.car_transporter = 200; // автовоз Украина
    this.certification = this.cert ? 220 : 0; // Сертификация автомоболия
    this.brokerage = 750;
    this.company_services = this.allInc ? 800 : 500;

    const auc = this.auction === 1 ? this.copart : this.iaai;

    if (this.engineType == 2) {
      if (3500 < this.amountn) {
        this.fuel_basic_excise = 150 * 1.2; // 1.11 - перевод из евро в доллары
      } else {
        this.fuel_basic_excise = 75 * 1.2; // 1.11 - перевод из евро в доллары
      }
    } else if (this.engineType == 1) {
      if (3000 < this.amountn) {
        this.fuel_basic_excise = 100 * 1.2; // 1.11 - перевод из евро в доллары
      } else {
        this.fuel_basic_excise = 50 * 1.2; // 1.11 - перевод из евро в доллары
      }
    }

    console.log(this.auction);

    if (this.auction === 1) {
      if (0.01 <= this.costn && this.costn <= 49.99) {
        this.auction_fee = 1;
      } else if (50 <= this.costn && this.costn <= 99.99) {
        this.auction_fee = 1;
      } else if (100 <= this.costn && this.costn <= 199.99) {
        this.auction_fee = 25 + 39;
      } else if (200 <= this.costn && this.costn <= 299.99) {
        this.auction_fee = 50 + 39;
      } else if (300 <= this.costn && this.costn <= 399.99) {
        this.auction_fee = 75 + 39;
      } else if (400 <= this.costn && this.costn <= 499.99) {
        this.auction_fee = 110 + 39;
      } else if (500 <= this.costn && this.costn <= 549.99) {
        this.auction_fee = 125 + 49;
      } else if (550 <= this.costn && this.costn <= 599.99) {
        this.auction_fee = 130 + 49;
      } else if (600 <= this.costn && this.costn <= 699.99) {
        this.auction_fee = 140 + 49;
      } else if (700 <= this.costn && this.costn <= 799.99) {
        this.auction_fee = 155 + 49;
      } else if (800 <= this.costn && this.costn <= 899.99) {
        this.auction_fee = 170 + 49;
      } else if (900 <= this.costn && this.costn <= 999.99) {
        this.auction_fee = 185 + 49;
      } else if (1000 <= this.costn && this.costn <= 1199.99) {
        this.auction_fee = 200 + 69;
      } else if (1200 <= this.costn && this.costn <= 1299.99) {
        this.auction_fee = 225 + 69;
      } else if (1300 <= this.costn && this.costn <= 1399.99) {
        this.auction_fee = 240 + 69;
      } else if (1400 <= this.costn && this.costn <= 1499.99) {
        this.auction_fee = 250 + 69;
      } else if (1500 <= this.costn && this.costn <= 1599.99) {
        this.auction_fee = 260 + 79;
      } else if (1600 <= this.costn && this.costn <= 1699.99) {
        this.auction_fee = 275 + 79;
      } else if (1700 <= this.costn && this.costn <= 1799.99) {
        this.auction_fee = 285 + 79;
      } else if (1800 <= this.costn && this.costn <= 1999.99) {
        this.auction_fee = 300 + 79;
      } else if (2000 <= this.costn && this.costn <= 2499.99) {
        this.auction_fee = 325 + 89;
      } else if (2500 <= this.costn && this.costn <= 2999.99) {
        this.auction_fee = 350 + 89;
      } else if (3000 <= this.costn && this.costn <= 3499.99) {
        this.auction_fee = 400 + 89;
      } else if (3500 <= this.costn && this.costn <= 3999.99) {
        this.auction_fee = 450 + 89;
      } else if (4000 <= this.costn && this.costn <= 4499.99) {
        this.auction_fee = 475 + 99;
      } else if (4500 <= this.costn && this.costn <= 4999.99) {
        this.auction_fee = 500 + 99;
      } else if (5000 <= this.costn && this.costn <= 5999.99) {
        this.auction_fee = 525 + 99;
      } else if (6000 <= this.costn && this.costn <= 7499.99) {
        this.auction_fee = 550 + 119;
      } else if (7500 <= this.costn && this.costn <= 9999.99) {
        if (7500 <= this.costn && this.costn <= 7999.99) {
          this.auction_fee = 575 + 119;
        } else {
          this.auction_fee = 575 + 129;
        }
      } else if (10000 <= this.costn && this.costn <= 14999.99) {
        this.auction_fee = 600 + 129;
      } else if (15000 <= this.costn && this.costn <= 19999.99) {
        this.auction_fee = this.costn * 0.04 + 129;
      } else if (20000 <= this.costn && this.costn <= 24999.99) {
        this.auction_fee = this.costn * 0.04 + 129;
      } else if (25000 <= this.costn && this.costn <= 29999.99) {
        this.auction_fee = this.costn * 0.04 + 129;
      } else if (30000 <= this.costn && this.costn <= 34999.99) {
        this.auction_fee = this.costn * 0.04 + 129;
      } else if (35000 <= this.costn) {
        this.auction_fee = this.costn * 0.04 + 129;
      }

      this.auction_fee = this.auction_fee + 59;
      console.log(this.auction_fee)
    } else if (this.auction === 2) {
      if (0.01 <= this.costn && this.costn <= 49.99) {
        this.auction_fee = 1;
      } else if (50 <= this.costn && this.costn <= 99.99) {
        this.auction_fee = 1;
      } else if (100 <= this.costn && this.costn <= 199.99) {
        this.auction_fee = 40 + 39;
      } else if (200 <= this.costn && this.costn <= 299.99) {
        this.auction_fee = 60 + 39;
      } else if (300 <= this.costn && this.costn <= 399.99) {
        this.auction_fee = 39;
        if (300 <= this.costn && this.costn <= 349.99) {
          this.auction_fee += 75;
        } else {
          this.auction_fee += 90;
        }
      } else if (400 <= this.costn && this.costn <= 499.99) {
        this.auction_fee = 100 + 39;
      } else if (500 <= this.costn && this.costn <= 599.99) {
        this.auction_fee = 130 + 49;
      } else if (600 <= this.costn && this.costn <= 699.99) {
        this.auction_fee = 145 + 49;
      } else if (700 <= this.costn && this.costn <= 799.99) {
        this.auction_fee = 160 + 49;
      } else if (800 <= this.costn && this.costn <= 899.99) {
        this.auction_fee = 175 + 49;
      } else if (900 <= this.costn && this.costn <= 999.99) {
        this.auction_fee = 190 + 49;
      } else if (1000 <= this.costn && this.costn <= 1199.99) {
        this.auction_fee = 69;
        if (1000 <= this.costn && this.costn <= 1099.99) {
          this.auction_fee += 205;
        } else {
          this.auction_fee += 220;
        }
      } else if (1200 <= this.costn && this.costn <= 1399.99) {
        this.auction_fee = 69;
        if (1200 <= this.costn && this.costn <= 1299.99) {
          this.auction_fee += 230;
        } else {
          this.auction_fee += 240;
        }
      } else if (1400 <= this.costn && this.costn <= 1499.99) {
        this.auction_fee = 255 + 69;
      } else if (1500 <= this.costn && this.costn <= 1599.99) {
        this.auction_fee = 270 + 79;
      } else if (1600 <= this.costn && this.costn <= 1799.99) {
        this.auction_fee = 300 + 79;
      } else if (1800 <= this.costn && this.costn <= 1999.99) {
        this.auction_fee = 310 + 79;
      } else if (2000 <= this.costn && this.costn <= 2399.99) {
        this.auction_fee = 89;
        if (2000 <= this.costn && this.costn <= 2199.99) {
          this.auction_fee += 325;
        } else {
          this.auction_fee += 330;
        }
      } else if (2400 <= this.costn && this.costn <= 2499.99) {
        this.auction_fee = 345 + 89;
      } else if (2500 <= this.costn && this.costn <= 2699.99) {
        this.auction_fee = 360 + 89;
      } else if (2700 <= this.costn && this.costn <= 2999.99) {
        this.auction_fee = 360 + 89;
      } else if (3000 <= this.costn && this.costn <= 3999.99) {
        this.auction_fee = 89;
        if (3000 <= this.costn && this.costn <= 3499.99) {
          this.auction_fee += 400;
        } else {
          this.auction_fee += 450;
        }
      } else if (4000 <= this.costn && this.costn <= 5999.99) {
        this.auction_fee = 99;
        if (4000 <= this.costn && this.costn <= 4499.99) {
          this.auction_fee += 475;
        } else if (4500 <= this.costn && this.costn <= 4999.99) {
          this.auction_fee += 500;
        } else {
          this.auction_fee += 525;
        }
      } else if (6000 <= this.costn && this.costn <= 7499.99) {
        this.auction_fee = 550 + 119;
      } else if (7500 <= this.costn && this.costn <= 9999.99) {
        this.auction_fee = 500 + this.costn * 0.01;
        if (8000 <= this.costn) {
          this.auction_fee += 129;
        } else {
          this.auction_fee += 119;
        }
      } else if (10000 <= this.costn && this.costn <= 14999.99) {
        this.auction_fee = 500 + this.costn * 0.01 + 129;
      } else if (15000 <= this.costn && this.costn <= 19999.99) {
        this.auction_fee = 500 + this.costn * 0.01 + 129;
      } else if (20000 <= this.costn) {
        this.auction_fee = this.costn * 0.04 + 129;
      }
      this.auction_fee += 59;
    }

    console.log(this.auction_fee)



    this.insuranceCost = this.insurance
      ? (this.costn + this.auction_fee) * 0.02
      : 0;

    if (auc.filter((r: any) => r.location === this.state).length > 0) {
      this.overland_delivery_price = (this.state
        ? (auc.filter((r: any) => r.location === this.state)[0].value + 125)
        : 0); // доставка по суше, Америка
        console.log(this.overland_delivery_price);
    } else {
      this.overland_delivery_price = 0;
      this.state = '';
    }


    this.state
      ? this.getFreight(
        auc.filter((r: any) => r.location === this.state)[0].port
      )
      : '';

    // console.log(this.portPrice, this.overland_delivery_price);

    this.delivery_price = this.portPrice + this.overland_delivery_price;
    this.customs_duty = (this.costn + this.auction_fee + 1000) * 0.1; // 400 - усредненная доставка
    this.excise = this.fuel_basic_excise * (this.amountn / 1000) * this.yearn;

    this.nds =
      (this.costn + this.auction_fee + this.customs_duty + this.excise + 1000) * 0.2;

    console.log(this.customs_duty, this.excise, this.nds)
    this.brokers_pay = this.customs_duty + this.excise + this.nds;


    // постановка на учет
    if (this.cert) {
      if ((this.costn + this.auction_fee) * 24 <= 316965) {
        this.first_registration = (this.costn + this.auction_fee + 1000) * 0.03;
      } else if (
        316966 <= (this.costn + this.auction_fee) * 24 &&
        (this.costn + this.auction_fee) * 24 <= 557090
      ) {
        this.first_registration = (this.costn + this.auction_fee + 1000) * 0.04;
      } else if (557091 <= (this.costn + this.auction_fee) * 24) {
        this.first_registration = (this.costn + this.auction_fee + 1000) * 0.05;
      }
    } else {
      this.first_registration = 0;
    }

    this.summary_price = this.bigSum([
      this.costn,
      this.auction_fee,
      this.insuranceCost,
      this.delivery_price,
      this.brokerage,
      this.brokers_pay,
      this.company_services
    ]);
  }

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
        this.RESULT_DATA.filter((row) => row.type === 'Пошлина')[0].rate =
          '5.5%';
      } else {
        cbo2 = (cbo * 0.1).toFixed(2);
        this.RESULT_DATA.filter((row) => row.type === 'Пошлина')[0].rate =
          '10%';
      }

      aa2o = (koef * (a / 1000) * y * c2).toFixed(2);

      cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(
        2
      );
      cbocbo22 = cbocbo2 * 0.2;

      sum = (
        parseFloat(cbo2) +
        parseFloat(aa2o) +
        parseFloat(cbocbo22)
      ).toFixed(2);

      this.RESULT_DATA.filter((row) => row.type === 'Пошлина')[0].base = cbo;
      this.RESULT_DATA.filter((row) => row.type === 'Пошлина')[0].sum = cbo2;
      this.RESULT_DATA.filter((row) => row.type === 'Акциз')[0].base =
        a.toFixed(2) + ' куб.см.';
      this.RESULT_DATA.filter((row) => row.type === 'Акциз')[0].rate =
        y + 'х' + koef;
      this.RESULT_DATA.filter((row) => row.type === 'Акциз')[0].sum = aa2o;
      this.RESULT_DATA.filter((row) => row.type === 'НДС')[0].base = cbocbo2;
      this.RESULT_DATA.filter((row) => row.type === 'НДС')[0].rate = '20%';
      this.RESULT_DATA.filter((row) => row.type === 'НДС')[0].sum =
        cbocbo22.toFixed(2);
      this.RESULT_DATA.filter((row) => row.type === 'ВСЕГО')[0].sum = sum;

      sum2 = sum / c;

      this.crossMessage =
        'В расчёте использовался текущий курс НБУ - 1 ' +
        cur +
        ' = ' +
        c +
        ' грн. (НБУ)';
      this.totalMessage =
        'Итого, на таможню нужно заплатить ' +
        sum2.toFixed(2) +
        ' ' +
        cur +
        ' по курсу НБУ на день оформления';


    } catch (e) {
      // console.log(e);
    }
  }

  showDetails(mode = 1) {
    let text = '';
    if (mode === 1) {
      text =
        'Стандартный комплекс услуг по подбору, покупке, доставке, таможенному оформлению приобретенного авто + сопровождение ремонта, подбор и доставка запчастей, прохождение сертификации, постановка на учет.';
    } else if (mode === 2) {
      text =
        'Страхование авто от повреждений любого характера на всех этапах транспортировки.';
    } else if (mode === 3) {
      text = 'Включить в калькуляцию прохождение сертификации (220$) и Налог в Пенсионный фонд при регистрации ТС';
    } else if (mode === 4) {
      text =
        'Включить в калькуляцию Налог в Пенсионный фонд при регистрации ТС.';
    }
    const dialogRef = this.dialog.open(ModalNoticeComponent, {
      width: '610px',
      data: { text },
      scrollStrategy: new NoopScrollStrategy()
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
