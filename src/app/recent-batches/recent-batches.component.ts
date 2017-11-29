import { Meta, Title } from '@angular/platform-browser';
import { CourseServiceService } from './../services/course-service.service';
import { UtilService } from './../services/util.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-recent-batches',
  templateUrl: './recent-batches.component.html',
  styleUrls: ['./recent-batches.component.scss']
})
export class RecentBatchesComponent implements OnInit {

  @ViewChild('joinPopup') joinPopup;
  constructor(private _title: Title, private _meta: Meta, private utilService: UtilService, private courseService: CourseServiceService,private router: Router) { }
  batches = [];
  batchdata = [];
  courses = [];
  ngOnInit() {

    this._title.setTitle('Upcoming Batches');
    this._meta.updateTag({ name: 'description', content: 'Upcoming Batches' });

    this.utilService.getRecentBatches().subscribe(res => {
      this.batchdata = res;
      this.courseService.getAllCourses().subscribe(courseData => {
        this.courses = courseData.courses;

        for(var i=0;i<this.batchdata.length;i++){
          var batch = this.batchdata[i];

          var id = batch['courseId'];
          var out = batch;
          var course = this.courses.filter(data => data.id === id)[0];
          out.name = course.name;
          out.price = course.price;
          out.duration = course.duration;
          this.batches.push(out);
        }
      })
    })
  }

  btnMoreDetails(name){
    var courseName = this.courseService.cleanName(name);
    this.router.navigate(['courses', courseName]);
  }

  joinButton(name){
    this.joinPopup.courseName = name; 
    this.joinPopup.openPopup();
  }

}
