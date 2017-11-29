import { Title, Meta } from '@angular/platform-browser';
import { CourseServiceService } from './../services/course-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  public allCourses;
  constructor(private _title: Title, private _meta: Meta, private courseService: CourseServiceService) { }

  ngOnInit() {
    this._title.setTitle('Courses');
    this._meta.updateTag({ name: 'description', content: 'Courses Page' });
    this.courseService.getAllCourses().subscribe(res => {
      this.allCourses = res.courses;
    });
  }

}
