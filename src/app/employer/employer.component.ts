import { Meta, Title } from '@angular/platform-browser';
import { ContactService } from './../services/contact.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {
  recaptchaDone = false;
  constructor(private _title: Title, private _meta: Meta, private contactService: ContactService) { }

  @ViewChild('captchaRef') recaptcha;
  ngOnInit() {  
    this._title.setTitle('Hire Employees');
    this._meta.updateTag({ name: 'description', content: 'Hire Page Description' });
  }

  resolved(ev){
    this.recaptchaDone = true;
  }

  onSubmit(form){
    var dataToSend = form.value;
    dataToSend.type = 'employer';
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
