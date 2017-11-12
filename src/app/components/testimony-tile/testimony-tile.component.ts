import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'testimony-tile',
  templateUrl: './testimony-tile.component.html',
  styleUrls: ['./testimony-tile.component.scss']
})
export class TestimonyTileComponent implements OnInit {

  @Input() data;
  contentLength = 500;
  moreContent = false;
  constructor() { }

  ngOnInit() {
  }

}
