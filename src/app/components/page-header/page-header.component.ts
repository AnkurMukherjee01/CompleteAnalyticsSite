import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() text;
  constructor() { }

  ngOnInit() {
  }

}
