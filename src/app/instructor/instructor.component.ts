import { ContactService } from './../services/contact.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {
  recaptchaDone = false;
  constructor(private contactService: ContactService) { }

  @ViewChild('captchaRef') recaptcha;
  ngOnInit() {  
  }

  resolved(ev){
    this.recaptchaDone = true;
  }

  onSubmit(form){
    var dataToSend = form.value;
    dataToSend.type = 'instructor';
    this.contactService.postMessageData(dataToSend).subscribe((res) => {
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
