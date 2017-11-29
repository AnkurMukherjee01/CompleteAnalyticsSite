import { Router } from '@angular/router';
import { UtilService } from './../services/util.service';
import { CourseServiceService } from './../services/course-service.service';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public courses;
  public popularCourses;

  constructor(
    private _title: Title,
    private _meta: Meta,
    private courseService: CourseServiceService,
    private router: Router) {

      this.courseService.getAllCourses().subscribe((res) => {
        this.courses = res.courses;
        this.popularCourses = res.popularCourses;
      });
   }

  ngOnInit() {
    this._title.setTitle('Home Page');
    this._meta.updateTag({ name: 'description', content: 'Home Page Description' });
  }

  viewMoreCourses(){
    this.router.navigate(['courses']);
  }

}
