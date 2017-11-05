import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    
  }

  onSubmit(form){
    this.contactService.postMessageData(form.value).subscribe((res) => {
      if(res.status == 200){
        form.reset();
      }
    }, (err) => {
      
    })
  }

}
