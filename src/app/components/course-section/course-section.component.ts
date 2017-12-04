import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.scss']
})
export class CourseSectionComponent implements OnInit {

  @Input() sectionHeader;
  @Input() sectionContent;
  @Output() sectionChanged;
  open = false;
  constructor() {
    this.sectionChanged = new EventEmitter<any>();
   }

  ngOnInit() {
  }

  isSublist(item){
    return !(typeof item === 'string' || item instanceof String)
  }

  toggleSection(){
    this.open = !this.open;
    this.sectionChanged.emit();
  }

}
