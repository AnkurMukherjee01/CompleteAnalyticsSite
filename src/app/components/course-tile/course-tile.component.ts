import { CourseServiceService } from './../../services/course-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss']
})
export class CourseTileComponent implements OnInit {

  @Input() course;
  constructor(private router: Router, private courseService: CourseServiceService) { }

  ngOnInit() {
  }

  btnMoreDetails(name){
    var courseName = this.courseService.cleanName(name);
    this.router.navigate(['courses', courseName]);
  }

}
