import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class UtilService {

  constructor(private http: Http) { }

  getCarouselData(): Observable<any>{
    var url = 'assets/carousel.json';
    return this.http.get(url)
      .map((res) => res.json())
  }

  getCompaniesURL(): Observable<any>{
    var url = 'assets/companiesLogo.json';
    return this.http.get(url)
      .map((res) => res.json())
  }

  getTestimoniesData(section): Observable<any>{
    var url = 'assets/testimonies.json';
    return this.http.get(url)
      .map((res) => res.json())
      .map((res) => res[section])
  }

  getTestimoniesCoursesData(section, id): Observable<any>{
    var url = 'assets/testimonies.json';
    return this.http.get(url)
      .map((res) => res.json())
      .map((res) => res[section])
      .map(memberArray => {
        return memberArray.filter(x=> x.id === id)
      })
      .map(arr => arr[0])
      .map((res) => res.reviews)
  }

  getRecentBatches(){
    var url = 'assets/upcomingBatches.json';
    return this.http.get(url)
      .map((res) => res.json())
  }

  showContactPopup(){
    
  }

}
