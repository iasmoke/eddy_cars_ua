import { AfterViewInit, Component, OnInit } from '@angular/core';
import { usaJson } from './calc-delivery.constants';
import Big from 'big.js';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import * as echarts from 'echarts';
import { copart, iaai } from '../calc-car/calc-car.constants';

@Component({
  selector: 'app-calc-delivery',
  templateUrl: './calc-delivery.component.html',
  styleUrls: ['./calc-delivery.component.scss']
})
export class CalcDeliveryComponent implements OnInit, AfterViewInit {


  locs: any = {
    texas: {
      top: '270px',
      left: '300px'
    }
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

  deliveryPorts = [
    {
      text: 'Одесса',
      value: 1
    },
    {
      text: 'Крым наш',
      value: 2
    }
  ];

  auction = 1;

  copart: any = [];
  iaai: any = [];
  usaJson: any = {};

  port = 0;
  landPrice = 0;
  location = '';
  deliveryPort = '';

  RESULT_DATA = [
    { type: 'Пошлина', base: '', rate: '', sum: '' },
    { type: 'Акциз', base: '', rate: '', sum: '' },
    { type: 'НДС', base: '', rate: '', sum: '' },
    { type: 'ВСЕГО', base: '', rate: '', sum: '' },
  ];

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
  brokerage: any;
  delivery_price: any = 0;
  customs_duty: number = 0;
  excise: number = 0;
  nds: number = 0;
  brokers_pay: any = 0;
  first_registration: number = 0;
  summary_price: any = 0;

  constructor() {
    this.copart = copart;
    this.iaai = iaai;
  }

  ngOnInit(): void {

    const unique = (value: any, index: any, self: string | any[]) => {
      return self.indexOf(value) === index
    }

    const ages = [26, 27, 26, 26, 28, 28, 29, 29, 30]
    const uniqueAges = ages.filter(unique)

  }

  ngAfterViewInit() {
    this.usaJson = usaJson;
    interval(0).pipe(take(1)).subscribe(() => {
      this.getChart();
    })
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
    if (this.uchet) {
      if ((this.costn + this.auction_fee) * 24 <= 316965) {
        this.first_registration = (this.costn + this.auction_fee) * 0.03;
      } else if (
        316966 <= (this.costn + this.auction_fee) * 24 &&
        (this.costn + this.auction_fee) * 24 <= 557090
      ) {
        this.first_registration = (this.costn + this.auction_fee) * 0.04;
      } else if (557091 <= (this.costn + this.auction_fee) * 24) {
        this.first_registration = (this.costn + this.auction_fee) * 0.05;
      }
    } else {
      this.first_registration = 0;
    }

    this.summary_price = this.bigSum([
      this.costn,
      this.auction_fee,
      this.insuranceCost,
      this.delivery_price,
      this.customs_duty,
      this.excise,
      this.nds,
      this.customs_broker,
      this.car_transporter,
      this.company_services
    ]);
  }

  bigSum(arr: any) {
    return arr.reduce((a: any, c: any) => +Big(a).plus(c));
  }

  getChart() {

    const chartDom: any = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    let option: any = {};

    echarts.registerMap('USA', this.usaJson, {
      Alaska: {              // 把阿拉斯加移到美国主大陆左下方
          left: -131,
          top: 25,
          width: 15
      },
      Hawaii: {
          left: -110,        // 夏威夷
          top: 28,
          width: 5
      },
      'Puerto Rico': {       // 波多黎各
          left: -76,
          top: 26,
          width: 2
      }
  });
  option = {
      title: {
          text: 'USA Population Estimates (2012)',
          subtext: 'Data from www.census.gov',
          sublink: 'http://www.census.gov/popest/data/datasets.html',
          left: 'right'
      },
      tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params: any) {
              let value: any = (params.value + '').split('.');
              value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
              return params.seriesName + '<br/>' + params.name + ': ' + value;
          }
      },
      visualMap: {
          left: 'right',
          min: 500000,
          max: 38000000,
          inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          },
          text: ['High', 'Low'],           // 文本，默认为数值文本
          calculable: true
      },
      toolbox: {
          show: true,
          //orient: 'vertical',
          left: 'left',
          top: 'top',
          feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
          }
      },
      series: [
          {
              name: 'USA PopEstimates',
              type: 'map',
              roam: true,
              map: 'USA',
              emphasis: {
                  label: {
                      show: true
                  }
              },
              // 文本位置修正
              textFixed: {
                  Alaska: [20, -20]
              },
              data:[
                  {name: 'Alabama', value: 4822023},
                  {name: 'Alaska', value: 731449},
                  {name: 'Arizona', value: 6553255},
                  {name: 'Arkansas', value: 2949131},
                  {name: 'California', value: 38041430},
                  {name: 'Colorado', value: 5187582},
                  {name: 'Connecticut', value: 3590347},
                  {name: 'Delaware', value: 917092},
                  {name: 'District of Columbia', value: 632323},
                  {name: 'Florida', value: 19317568},
                  {name: 'Georgia', value: 9919945},
                  {name: 'Hawaii', value: 1392313},
                  {name: 'Idaho', value: 1595728},
                  {name: 'Illinois', value: 12875255},
                  {name: 'Indiana', value: 6537334},
                  {name: 'Iowa', value: 3074186},
                  {name: 'Kansas', value: 2885905},
                  {name: 'Kentucky', value: 4380415},
                  {name: 'Louisiana', value: 4601893},
                  {name: 'Maine', value: 1329192},
                  {name: 'Maryland', value: 5884563},
                  {name: 'Massachusetts', value: 6646144},
                  {name: 'Michigan', value: 9883360},
                  {name: 'Minnesota', value: 5379139},
                  {name: 'Mississippi', value: 2984926},
                  {name: 'Missouri', value: 6021988},
                  {name: 'Montana', value: 1005141},
                  {name: 'Nebraska', value: 1855525},
                  {name: 'Nevada', value: 2758931},
                  {name: 'New Hampshire', value: 1320718},
                  {name: 'New Jersey', value: 8864590},
                  {name: 'New Mexico', value: 2085538},
                  {name: 'New York', value: 19570261},
                  {name: 'North Carolina', value: 9752073},
                  {name: 'North Dakota', value: 699628},
                  {name: 'Ohio', value: 11544225},
                  {name: 'Oklahoma', value: 3814820},
                  {name: 'Oregon', value: 3899353},
                  {name: 'Pennsylvania', value: 12763536},
                  {name: 'Rhode Island', value: 1050292},
                  {name: 'South Carolina', value: 4723723},
                  {name: 'South Dakota', value: 833354},
                  {name: 'Tennessee', value: 6456243},
                  {name: 'Texas', value: 26059203},
                  {name: 'Utah', value: 2855287},
                  {name: 'Vermont', value: 626011},
                  {name: 'Virginia', value: 8185867},
                  {name: 'Washington', value: 6897012},
                  {name: 'West Virginia', value: 1855413},
                  {name: 'Wisconsin', value: 5726398},
                  {name: 'Wyoming', value: 576412},
                  {name: 'Puerto Rico', value: 3667084}
              ]
          }
      ]
  };

  myChart.setOption(option);
  }

  getSum(arr: any = []) {
    return arr.reduce((arr: any, cur: any) => +Big(arr).plus(cur), 0);
  }

  getFreight(port: any) {

    try {
      // console.log((auction === 1 ? this.copart : this.iaai).filter((row: any) => ((row.location === this.location) && (row.port === this.port))));
      this.landPrice = (this.auction === 1 ? this.copart : this.iaai).filter((row: any) => ((row.location === this.location) && (row.port === this.port)))[0].value + 125;
    } catch (e) {
      this.landPrice = 0;
    }

    console.log(this.auction === 1 ? this.copart : this.iaai);

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

    this.portPrice += 125;

  }

  getUnique() {

    // const unique = (value: any, index: any, self: string | any[]) => {
    //   return self.indexOf(value) === index
    // }

    let tmp = this.auction === 1 ? this.copart : this.iaai;

    console.log(tmp);
    // console.log(tmp.filter((row: any) => row.location === this.port));


    if (tmp.filter((row: any) => row.location === this.location).length === 1) {
      this.port = tmp.filter((row: any) => row.location === this.location)[0].port;
      this.getFreight(this.port);
    }

    console.log(tmp.map((row: any) => row.location));

    console.log(tmp.filter((row: any) => row.location === this.location));



    return tmp.filter((row: any) => row.location === this.location);

  }

  filterPort(state: string = 'TX') {

    let tmp = this.auction === 1 ? this.copart : this.iaai;

    return tmp.filter((_: any) => _.port === state);
  }

  getLength(arr: any) {
    return arr ? arr.length : 0;
  }

  getLoc(state: string) {
    return this.locs[state];
  }

}
