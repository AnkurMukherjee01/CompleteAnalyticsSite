import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() rating;
  @Input() maxRating;
  @Input() maxStars;
  constructor() { }

  ngOnInit() {
  }

}
