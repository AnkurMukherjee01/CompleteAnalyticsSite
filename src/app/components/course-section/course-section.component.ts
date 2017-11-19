import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.scss']
})
export class CourseSectionComponent implements OnInit {

  @Input() sectionHeader;
  @Input() sectionContent;
  open = false;
  constructor() { }

  ngOnInit() {
  }

  isSublist(item){
    return !(typeof item === 'string' || item instanceof String)
  }

  toggleSection(){
    this.open = !this.open;
  }

}
