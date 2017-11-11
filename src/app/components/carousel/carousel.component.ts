import { Component, OnInit } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';
import { UtilService } from '../../services/util.service';
@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  public carouselData;
  constructor(private utilService: UtilService) { 
    this.utilService.getCarouselData().subscribe((res) => {
      this.carouselData = res;
    })
  }

  public carouselOne: NguCarousel;
  
    ngOnInit() {
      this.carouselOne = {
        grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
        slide: 1,
        speed: 400,
        interval: 4000,
        point: {
          visible: true
        },
        load: 2,
        touch: true,
        loop: true,
        custom: 'banner'
      }
    }
  
}

