import { FileDownloadService } from './../services/file-download.service';
import { CourseServiceService } from './../services/course-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
  constructor(private route: ActivatedRoute, private courseSevice: CourseServiceService, private fileDownload: FileDownloadService) {   }
  
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
      })
    });
  }

  tabChanged(index){
    console.log(index);
    this.currentTab = this.totalTabs[index];
    if(this.course){
      this.courseSevice.getCourseDetails(this.course.id, this.currentTab).subscribe(res => {
        this.currentContent = res;
      });
    }
  }

  downloadPDF(){
    let downloadUrl = 'assets/courses/' + this.course.id + '/course_content.pdf';
    this.fileDownload.downloadFile(downloadUrl, this.course.name);
  }

}
