import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc-customs',
  templateUrl: './calc-customs.component.html',
  styleUrls: ['./calc-customs.component.scss']
})
export class CalcCustomsComponent implements OnInit {


  RESULT_DATA = [
    {type: 'Пошлина',  base: '', rate: '', sum: '' },
    {type: 'Акциз',    base: '', rate: '', sum: '' },
    {type: 'НДС',      base: '', rate: '', sum: '' },
    {type: 'ВСЕГО',    base: '', rate: '', sum: '' }
  ];

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
  ];

  // cross: any = {
  //   eur: 33.4249,
  //   usd: 28.5074,
  //   pln: 7.3528
  // };

  cross: any = {
    eur: 1,
    usd: 1,
    pln: 1
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

  volumes = [
    1000,
    1500,
    2000
  ];

  years = [
    2019,
    2020,
    2021
  ];

  constructor() { }

  ngOnInit(): void {
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
        this.RESULT_DATA.filter(row => row.type === 'Пошлина')[0].rate = '5.5%';
      } else {
        cbo2 = (cbo * 0.1).toFixed(2);
        this.RESULT_DATA.filter(row => row.type === 'Пошлина')[0].rate = '10%';
      };

      aa2o = (koef * (a / 1000) * y * c2).toFixed(2);

      cbocbo2 = (parseFloat(cbo) + parseFloat(cbo2) + parseFloat(aa2o)).toFixed(2);
      cbocbo22 = cbocbo2 * 0.2;

      sum = (parseFloat(cbo2) + parseFloat(aa2o) + parseFloat(cbocbo22)).toFixed(2);

      this.RESULT_DATA.filter(row => row.type === 'Пошлина')[0].base = cbo;
      this.RESULT_DATA.filter(row => row.type === 'Пошлина')[0].sum = cbo2;
      this.RESULT_DATA.filter(row => row.type === 'Акциз')[0].base = a.toFixed(2) + ' куб.см.';
      this.RESULT_DATA.filter(row => row.type === 'Акциз')[0].rate = y + 'х' + koef;
      this.RESULT_DATA.filter(row => row.type === 'Акциз')[0].sum = aa2o;
      this.RESULT_DATA.filter(row => row.type === 'НДС')[0].base = cbocbo2;
      this.RESULT_DATA.filter(row => row.type === 'НДС')[0].rate = '20%';
      this.RESULT_DATA.filter(row => row.type === 'НДС')[0].sum = cbocbo22.toFixed(2);
      this.RESULT_DATA.filter(row => row.type === 'ВСЕГО')[0].sum = sum;

      sum2 = sum / c;

      this.crossMessage = 'В расчёте использовался текущий курс НБУ - 1 ' + cur + ' = ' + c + ' грн. (НБУ)';
      this.totalMessage = 'Итого, на таможню нужно заплатить ' + sum2.toFixed(2) + ' ' + cur + ' по курсу НБУ на день оформления';

      console.log(this.RESULT_DATA);
    } catch(e) {
      console.log(e);
    }
  }

  getData(field: string) {
    return this.RESULT_DATA.filter(row => row.type === field)[0] ? this.RESULT_DATA.filter(row => row.type === field)[0].sum : 0;
  }

}
