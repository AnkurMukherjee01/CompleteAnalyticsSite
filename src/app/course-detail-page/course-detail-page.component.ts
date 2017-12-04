import { Meta, Title } from '@angular/platform-browser';
import { ContactService } from './../services/contact.service';
import { UtilService } from './../services/util.service';
import { FileDownloadService } from './../services/file-download.service';
import { CourseServiceService } from './../services/course-service.service';
import { Component, OnInit, ViewContainerRef, ViewChild, TemplateRef, HostListener,ElementRef, Renderer, ViewChildren, SimpleChanges } from '@angular/core';
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

  followContentMarginTop = 10;
  courseDetailsPageHeight;
  followContentHeight;

  @ViewChild('downloadPopup') downloadPopup;
  @ViewChild('joinPopup') joinPopup;
  @ViewChildren('detailsPage') detailsPageQL;
  @ViewChildren('followContent') followContentQL;
  detailsPage;
  followContent;
  constructor(private _title: Title, private _meta: Meta, private route: ActivatedRoute, private courseSevice: CourseServiceService, private fileDownload: FileDownloadService, private utilService: UtilService,public modal: Modal, private contactService: ContactService, private element: ElementRef, private renderer: Renderer) {   }
  
  ngOnInit() {
    this._title.setTitle('Course Details');
    this._meta.updateTag({ name: 'description', content: 'Course Details' });

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

  ngAfterViewInit(): void{
    this.detailsPageQL.changes.subscribe((comp) => {
      this.detailsPage = comp.first;

      if(this.detailsPage){
        this.courseDetailsPageHeight = this.detailsPage.nativeElement.clientHeight;
      }

    })

    this.followContentQL.changes.subscribe((comp) => {
      this.followContent = comp.first;

      if(this.followContent){
        this.followContentHeight = this.followContent.nativeElement.clientHeight;
      }
      
    })
    if(this.detailsPage && this.followContent){
      this.calculateSideContentPosition();
    }
  }

  tabChanged(index){
    this.currentTab = this.totalTabs[index];
    if(this.course){
      this.courseSevice.getCourseDetails(this.course.id, this.currentTab).subscribe(res => {
        this.currentContent = res;
      });
    }
    this.calculateHeight();
  }

  calculateHeight(){
    if(this.detailsPage){
      this.courseDetailsPageHeight = this.detailsPage.nativeElement.clientHeight;
    }
    if(this.followContent){
      this.followContentHeight = this.followContent.nativeElement.clientHeight;
    }
  }

  calculateSideContentPosition(){
    if(window.innerWidth >= 768){
      var scrolly = window.scrollY;
    
      if(this.followContent){
        if((scrolly + this.followContentHeight) < this.courseDetailsPageHeight - 20 ){
          this.followContentMarginTop = scrollY + 10;
          this.followContent.nativeElement.classList.remove('stiky');
        }else{
          this.followContent.nativeElement.classList.add('stiky');
        }
      }
    }
  }

  sectionChanged(){
    setTimeout(() => {
      this.calculateHeight();
      this.calculateSideContentPosition();
    }, 1000);
  }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.calculateSideContentPosition();
  }

  @HostListener('window:resize', ['$event']) onResizeEvent($event){
    this.calculateHeight();
  }
  // resolved(ev){
  //   this.recaptchaDone = true;
  // }

  // onSubmit(form){
  //   var dataToSend = form.value;
  //   dataToSend.type = 'download PDF';
  //   dataToSend.courseName = this.course.name;
  //   this.contactService.postMessageData(dataToSend).subscribe((res) => {
  //     if(res.status == 200){
  //       form.reset();
  //       this.recaptcha.reset();
  //       this.dialogRef.close(true);
  //       this.downloadPDF();
  //     }
  //   }, (err) => {
  //     alert("Message not sent. Please try again");
  //   })
  // }

  downloadPDF(){
    let downloadUrl = 'assets/courses/' + this.course.id + '/course_content.pdf';
    this.fileDownload.downloadFile(downloadUrl, this.course.name);
  }

  downloadPDFBtn(){
    this.downloadPopup.openPopup();
  }

  joinButton(){
    this.joinPopup.openPopup();
  }
}
