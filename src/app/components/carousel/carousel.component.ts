import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  urls = ["assets/images/cover4.jpeg","assets/images/cover2.jpeg","assets/images/cover1.jpeg"]
  constructor() { }

  public carouselOne: NgxCarousel;
  
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
  
    public myfunc(event: Event) {
       
    }
  
}

