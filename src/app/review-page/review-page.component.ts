import { Title, Meta } from '@angular/platform-browser';
import { UtilService } from './../services/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit {

  testimoniesData;
  constructor(private _title: Title, private _meta: Meta, private utilService: UtilService) { }

  ngOnInit() {
    this._title.setTitle('Reviews');
    this._meta.updateTag({ name: 'description', content: 'Reviews' });
    this.utilService.getTestimoniesData("homePage").subscribe(res => {
      this.testimoniesData = res;
    })
  }

}
