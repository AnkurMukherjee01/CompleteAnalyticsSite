import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss']
})
export class BannerImageComponent implements OnInit {

  @Input() src;
  @Input() height;
  constructor() { }

  ngOnInit() {
  }

}
