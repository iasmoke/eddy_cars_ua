import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { from, of } from 'rxjs';
import { concatMap, delay, map, take } from 'rxjs/operators';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {

  filterValues: any = {
    mkn: ''
  };

  filters = [
    // {
    //   alias: 'type',
    //   text: 'Тип лота',
    //   values: [],
    //   chosen: 0
    // },
    {
      alias: 'mkn',
      text: 'Марка',
      values: [
        'KIA',
        'BMW'
      ],
      chosen: 0
    }  ,
    {
      alias: 'lm',
      text: 'Модель',
      values: [],
      chosen: 0
    }  ,
    {
      alias: 'hb',
      text: 'Цена',
      values: [],
      chosen: 0
    }  ,
    {
      alias: 'lcy',
      text: 'Год выпуска',
      values: [],
      chosen: 0
    }  ,
    {
      alias: 'orr',
      text: 'Пробег',
      values: [],
      chosen: 0
    }  ,
    {
      alias: 'ft',
      text: 'Топливо',
      values: [],
      chosen: 0
    }  ,
    // {
    //   alias: 'body',
    //   text: 'Кузов',
    //   values: [],
    //   chosen: 0
    // } ,
    {
      alias: 'dd',
      text: 'Повреждения',
      values: [],
      chosen: 0
    }
  ];

  dataSource: any = [];

  constructor(private dbs: FormsService) { }

  ngOnInit(): void {
    this.dbs.postGetAuction().pipe(take(1), map(_ => JSON.parse(_))).subscribe(_postGetAuction => {
      console.log(_postGetAuction);

      this.dataSource =  new MatTableDataSource(_postGetAuction.data.results.content);
      this.dataSource.filterPredicate = this.createFilter();
      // from(this.dataSource).pipe(concatMap(a => of(a).pipe(delay(2000)))).subscribe((_element: any) => {
      //   console.log(_element);
      //   this.dbs.postGetPhoto(_element.ln).pipe(
      //     take(1),
      //     map(_ => JSON.parse(_).data.imagesList.FULL_IMAGE[0] || ''),

      //   ).subscribe(_postGetPhoto => {


      //     console.log(_postGetPhoto);
      //     _element.full_img = _postGetPhoto.url;
      //   })
      // });
    })
  }

  getDate(ms: any) {
    return ms ? (new Date(ms)).toLocaleDateString() : '';
  }

  getPhoto(lot_number: any) {
    return ;
  }

  getSelectValues(field: any) {
    return (field && this.dataSource.filteredData) ? ['', ...new Set(this.dataSource.filteredData.map((row: any) => row[field]))] : [];
  }

  createFilter() {
    const filterFunction = (data: any, filter: string): boolean => {
      // console.log(data);
      // console.log(JSON.parse(filter));
      const searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col] === null || searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      // console.log(searchTerms);

      const isNumeric = (num: any) => (typeof(num) === 'number' || typeof(num) === 'string' && num.trim() !== '') && !isNaN(num as number);

      const nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          found = true;
          for (const col in searchTerms) {
            if (col) {

              if (col === 'any') {
                // console.log(data);
                // console.log(Object.values(data));
                // console.log(searchTerms[col]);
                // console.log(Object.keys(data).filter(key => data[key] !== null ? data[key].toString().toLowerCase().indexOf(searchTerms[col].toString()) !== -1 : false));
                if (Object.keys(data).filter(key => data[key] !== null ? data[key].toString().toLowerCase().indexOf(searchTerms[col].toString().toLowerCase()) !== -1 : false).length === 0) {
                  found = false;
                };
              } else {


                  if (data[col] !== null && isNumeric(data[col])) {
                    if (Number(data[col]) !== Number(searchTerms[col])) {
                      found = false;
                    } else {
                      // console.log(Number(data[col]), Number(searchTerms[col]));
                    }
                  } else if (data[col] === null) {
                    if (data[col] !== (searchTerms[col] === 'null' ? null : '')) {
                      found = false;
                    } else {
                      // console.log(Number(data[col]), Number(searchTerms[col]));
                    }
                  } else {
                    if (data[col].toLowerCase() !== searchTerms[col].toLowerCase()) {
                      found = false;
                    } else {
                      // console.log(data[col].toLowerCase(), searchTerms[col].toLowerCase());
                    }
                  }


            }

              // if (data[col] && (isNumeric(data[col]) ? Number(data[col]) : data[col].toLowerCase()) !== (isNumeric(searchTerms[col]) ? Number(searchTerms[col]) : searchTerms[col].toLowerCase())) {
              //   found = false;
              // }
              // searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              //   if (data[col] && data[col].toString().toLowerCase().indexOf(word) !== -1 && isFilterSet) {
              //     found = true;
              //   }
              // });
            }
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }



  filterChange(filter: any, value: any) {
    console.log(value);
    //let filterValues = {}

    this.filterValues[filter] = value !== null ? value.toString().trim() : null;
    console.log(this.filterValues);
    this.dataSource.filter = JSON.stringify(this.filterValues);
    console.log(this.dataSource);
  }

}
