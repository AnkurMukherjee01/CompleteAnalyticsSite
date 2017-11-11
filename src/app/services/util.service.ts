import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class UtilService {

  constructor(private http: Http) { }

  getCarouselData(): Observable<any>{
    return this.http.get('assets/carousel.json')
      .map((res) => res.json())
  }

  getCompaniesURL(): Observable<any>{
    return this.http.get('assets/companiesLogo.json')
    .map((res) => res.json())
  }

}
