import { UtilService } from './../services/util.service';
import { FileDownloadService } from './../services/file-download.service';
import { CourseServiceService } from './../services/course-service.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

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

  constructor(private route: ActivatedRoute, private courseSevice: CourseServiceService, private fileDownload: FileDownloadService, private utilService: UtilService,public modal: Modal) {   }
  
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

  downloadPDF(){
    const dialogRef = this.modal.alert()
    .size('lg')
    .showClose(true)
    .title('Enter Details')
    .body(`
    <div class="contactForm">
    <form>
        <div class="form-group">
          <label for="name">Name*</label>
          <input type="text" class="form-control" name="name" ngModel required #name="ngModel">
        </div>
            
        <div class="form-group">
          <label for="email">Email*</label>
          <input type="email" class="form-control" name="email" email="true" ngModel #email="ngModel" required>
        </div>
        
        <div class="form-group">
            <label for="name">Phone No</label>
            <input type="text" class="form-control" name="phoneNo" ngModel>
        </div>
        

        <div class="form-group">
            <label for="name">Subject*</label>
            <input type="text" class="form-control" name="subject" ngModel #subject="ngModel" required>
        </div>
        
        <div class="form-group">
            <label for="name">Message*</label>
            <input type="textarea" class="form-control" name="message" ngModel #message="ngModel" required>
        </div>
        
        <re-captcha #captchaRef="reCaptcha" (resolved)="resolved($event)" siteKey="6Lc3NTcUAAAAAEbbUbuzavH2Gni0yYJ0Fsvs1HbE" required></re-captcha>
    
        <button type="submit" [disabled]="!recaptchaDone || contactForm.invalid" class="btn btn-success">Send</button>
    
      </form>
    </div>
        `)
    .open();

    // let downloadUrl = 'assets/courses/' + this.course.id + '/course_content.pdf';
    // this.fileDownload.downloadFile(downloadUrl, this.course.name);
  }

}
