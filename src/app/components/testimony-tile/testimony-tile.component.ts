import { Component, OnInit, Input } from '@angular/core';
import { Overlay, overlayConfigFactory} from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'testimony-tile',
  templateUrl: './testimony-tile.component.html',
  styleUrls: ['./testimony-tile.component.scss']
})
export class TestimonyTileComponent implements OnInit {

  @Input() data;
  contentLength = 300;
  constructor(private modal: Modal) { }

  ngOnInit() {
  }

  showMore(){
    this.modal.alert()
    .title('Review')
    .body('<h3>'+ this.data.name +'</h3><span>'+ this.data.textContent +'</span>')
    .open();
  }

  linkedinBtn(){
    window.open(this.data.linkedinProfile);
  }

}
