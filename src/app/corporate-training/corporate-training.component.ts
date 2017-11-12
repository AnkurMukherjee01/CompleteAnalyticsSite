import { ContactService } from './../services/contact.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-corporate-training',
  templateUrl: './corporate-training.component.html',
  styleUrls: ['./corporate-training.component.scss']
})
export class CorporateTrainingComponent implements OnInit {

  recaptchaDone = false;
  constructor(private contactService: ContactService) { }

  @ViewChild('captchaRef') recaptcha;
  ngOnInit() {  
  }

  resolved(ev){
    this.recaptchaDone = true;
  }

  onSubmit(form){
    this.contactService.postMessageData(form.value).subscribe((res) => {
      if(res.status == 200){
        alert("Message sent successfully");
        form.reset();
        this.recaptcha.reset();
      }
    }, (err) => {
      alert("Message not sent. Please try again");
    })
  }


}
