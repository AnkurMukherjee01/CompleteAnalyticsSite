import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class UtilService {

  basePath = environment.basePath;
  constructor(private http: Http) { }

  getCarouselData(): Observable<any>{
    return this.http.get(this.basePath + 'assets/carousel.json')
      .map((res) => res.json())
  }

  getCompaniesURL(): Observable<any>{
    return this.http.get(this.basePath + 'assets/companiesLogo.json')
      .map((res) => res.json())
  }

  getTestimoniesData(section): Observable<any>{
    return this.http.get(this.basePath + 'assets/testimonies.json')
      .map((res) => res.json())
      .map((res) => res[section])
  }

  getTestimoniesCoursesData(section, id): Observable<any>{
    return this.http.get(this.basePath + 'assets/testimonies.json')
      .map((res) => res.json())
      .map((res) => res[section])
      .map(memberArray => {
        return memberArray.filter(x=> x.id === id)
      })
      .map(arr => arr[0])
      .map((res) => res.reviews)
  }

}
