import { Component, OnInit, Input } from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss']
})
export class CourseTileComponent implements OnInit {

  @Input() course;
  constructor() { }

  ngOnInit() {
  }

}
