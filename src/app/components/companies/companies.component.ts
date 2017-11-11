import { UtilService } from './../../services/util.service';
import { NguCarousel } from '@ngu/carousel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  public companiesUrl;
  constructor(private utilService: UtilService) {
    this.utilService.getCompaniesURL().subscribe(res => {
      this.companiesUrl = res;
    })
   }

  public companyCarousel: NguCarousel;
  ngOnInit() {
    this.companyCarousel = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
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
  }

}
