import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { environment } from '../../environments/environment';

@Injectable()
export class CourseServiceService {
  
  basePath = environment.basePath;
  constructor(private http: Http) { }

  getAllCourses() : Observable<any>{
    var url = this.basePath + 'assets/courses.json';
    return this.http.get(url)
      .map((res) => res.json())
  }

  cleanName(str){
    return str.replace(/\W+/g, '-').toLowerCase();
  }

  getCourse(name): Observable<any>{
    var url = this.basePath + 'assets/courses.json';
    return this.http.get(url)
      .map((res) => res.json())
      .map((data) => data.courses)
      .map(memberArray => {
        return memberArray.filter(x=> this.cleanName(x.name) === name)
      })
      .map(arr => arr[0]);
  }

  getCourseDetails(id, content): Observable<any>{
    var url = this.basePath + 'assets/courses/' + id + '/content.json';
    return this.http.get(url)
      .map((res) => res.json())
      .map((data) => data[content])
  }
}
