import { TestimonyTileComponent } from './../testimony-tile/testimony-tile.component';
import { UtilService } from './../../services/util.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit {

  testimoniesData;
  testimonyCarousel;
  @Input() page;
  constructor(private utilService: UtilService) { }

  ngOnInit() {
    this.testimonyCarousel = {
      grid: {xs: 1, sm: 2, md: 3, lg: 3, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }

    this.utilService.getTestimoniesData(this.page).subscribe(res => {
      this.testimoniesData = res;
    })
  }

}
