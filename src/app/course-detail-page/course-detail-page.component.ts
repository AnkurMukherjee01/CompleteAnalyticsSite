import { CourseServiceService } from './../services/course-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-course-detail-page',
  templateUrl: './course-detail-page.component.html',
  styleUrls: ['./course-detail-page.component.scss']
})
export class CourseDetailPageComponent implements OnInit {

  course
  constructor(private route: ActivatedRoute, private courseSevice: CourseServiceService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let name = params['name'];
      this.courseSevice.getCourse(name).subscribe((res) => {
        this.course = res;
        console.log(this.course);
      })
    });
  }

}
