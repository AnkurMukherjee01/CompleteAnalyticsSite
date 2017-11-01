import { CourseServiceService } from './../services/course-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  public allCourses;
  constructor(private courseService: CourseServiceService) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(res => {
      this.allCourses = res.courses;
    });
  }

}
