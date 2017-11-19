import { ContactService } from './../services/contact.service';
import { UtilService } from './../services/util.service';
import { FileDownloadService } from './../services/file-download.service';
import { CourseServiceService } from './../services/course-service.service';
import { Component, OnInit, ViewContainerRef, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Overlay } from 'ngx-modialog';
import { overlayConfigFactory } from "ngx-modialog";
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-course-detail-page',
  templateUrl: './course-detail-page.component.html',
  styleUrls: ['./course-detail-page.component.scss']
})
export class CourseDetailPageComponent implements OnInit {

  course: any;
  totalTabs = ['Course Outline', 'Case Study', 'Benefits'];
  currentTab: string;
  currentContent: any;
  reviewData;
  recaptchaDone = false;
  dialogRef;

  @ViewChild('templateRef') public templateRef: TemplateRef<any>;
  @ViewChild('captchaRef') recaptcha;
  constructor(private route: ActivatedRoute, private courseSevice: CourseServiceService, private fileDownload: FileDownloadService, private utilService: UtilService,public modal: Modal, private contactService: ContactService) {   }
  
  ngOnInit() {
    
    this.route.params.forEach((params: Params) => {
      let name = params['name'];
      this.courseSevice.getCourse(name).subscribe((res) => {
        this.course = res;
        if(!this.currentContent){
          this.courseSevice.getCourseDetails(this.course.id, 'Course Outline').subscribe(res => {
            this.currentContent = res;
          });
        }

        this.utilService.getTestimoniesCoursesData('courses', this.course.id).subscribe(res => {
          this.reviewData = res;
        })
      })
    });
  }

  tabChanged(index){
    this.currentTab = this.totalTabs[index];
    if(this.course){
      this.courseSevice.getCourseDetails(this.course.id, this.currentTab).subscribe(res => {
        this.currentContent = res;
      });
    }
  }

  resolved(ev){
    this.recaptchaDone = true;
  }

  onSubmit(form){
    var dataToSend = form.value;
    dataToSend.type = 'download PDF';
    dataToSend.courseName = this.course.name;
    this.contactService.postMessageData(dataToSend).subscribe((res) => {
      if(res.status == 200){
        form.reset();
        this.recaptcha.reset();
        this.dialogRef.close(true);
        this.downloadPDF();
      }
    }, (err) => {
      alert("Message not sent. Please try again");
    })
  }

  downloadPDF(){
    let downloadUrl = 'assets/courses/' + this.course.id + '/course_content.pdf';
    this.fileDownload.downloadFile(downloadUrl, this.course.name);
  }

  downloadPDFBtn(){
    this.modal
    .open(this.templateRef, overlayConfigFactory({ isBlocking: true }, BSModalContext))
    .then( dialog => {
      this.dialogRef = dialog;
    })
  }

}
