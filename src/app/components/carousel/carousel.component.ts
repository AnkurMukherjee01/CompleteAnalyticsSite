import { ContactPopupComponent } from './../contact-popup/contact-popup.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';
import { UtilService } from '../../services/util.service';
@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @ViewChild('contactPopup') contactPopup: ContactPopupComponent; 
  @ViewChild('projectPopup') projectPopup: ContactPopupComponent; 
  public carouselData;
  constructor(private utilService: UtilService,private router:Router ) { 
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

    isArray(data){
      return Array.isArray(data);
    }    

    ctaBtnClicked(id){
      switch(id){
        case 1:
          this.contactPopup.openPopup();
          break;
        case 2:
          this.router.navigate(['/become-instructor']);
          break;
        case 3:
          this.projectPopup.openPopup();
          break;
      }
    }
  
}

