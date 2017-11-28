import { UtilService } from './../services/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit {

  testimoniesData;
  constructor(private utilService: UtilService) { }

  ngOnInit() {
    this.utilService.getTestimoniesData("homePage").subscribe(res => {
      this.testimoniesData = res;
    })
  }

}
