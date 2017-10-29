import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class CourseServiceService {

  constructor(private http: Http) { }

  getAllCourses() : Observable<any>{
    return this.http.get('/assets/courses.json')
      .map((res) => res.json())
  }

}
