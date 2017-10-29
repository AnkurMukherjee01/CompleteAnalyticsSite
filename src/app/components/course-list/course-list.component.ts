import { PageHeaderComponent } from './../page-header/page-header.component';
import { CourseTileComponent } from './../course-tile/course-tile.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  entryComponents: [CourseTileComponent, PageHeaderComponent]
})
export class CourseListComponent implements OnInit {

  @Input() title;
  @Input() courses;
  constructor() { }

  ngOnInit() {
  }

}
