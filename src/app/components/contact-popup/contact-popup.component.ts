import { ContactService } from './../../services/contact.service';
import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { Overlay, overlayConfigFactory} from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'contact-popup',
  templateUrl: './contact-popup.component.html',
  styleUrls: ['./contact-popup.component.scss']
})
export class ContactPopupComponent implements OnInit {

  @Input() type;
  @Input() courseName;
  recaptchaDone = false;
  dialogRef;
  @ViewChild('templateRef') public templateRef: TemplateRef<any>;
  @ViewChild('captchaRef') recaptcha;

  constructor(private contactService: ContactService, private modal: Modal) { }

  ngOnInit() {
  }


  resolved(ev){
    this.recaptchaDone = true;
  }

  onSubmit(form){
    var dataToSend = form.value;
    dataToSend.type = this.type;
    if(this.courseName){
      dataToSend.courseName = this.courseName;
    }
    this.contactService.postMessageData(dataToSend).subscribe((res) => {
      if(res.status == 200){
        form.reset();
        this.recaptcha.reset();
        this.dialogRef.close(true);
      }
    }, (err) => {
      alert("Message not sent. Please try again");
    })
  }

  openPopup(){
    this.modal
    .open(this.templateRef, overlayConfigFactory({ isBlocking: true }, BSModalContext))
    .then( dialog => {
      this.dialogRef = dialog;
    })
  }

}
