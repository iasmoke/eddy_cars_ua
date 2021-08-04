import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  postMainForm(content: any) {
    return this.http.post(
      'http://www.eddycars.com.ua/assets/php/post_main_form.php',
      JSON.stringify(content)
    ).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  postGetAuction() {
    return this.http.post(
      'http://www.eddycars.com.ua/assets/php/post_get_auction.php',
      JSON.stringify({})
    ).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  postGetPhoto(lot_number: any) {
    return this.http.post(
      'http://www.eddycars.com.ua/assets/php/post_get_photo.php',
      JSON.stringify({
        lot_number
      })
    ).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

}
