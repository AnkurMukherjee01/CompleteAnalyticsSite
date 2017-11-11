import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RecaptchaModule } from 'ng-recaptcha'
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { NguCarouselModule } from '@ngu/carousel';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { BannerImageComponent } from './components/banner-image/banner-image.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseTileComponent } from './components/course-tile/course-tile.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { WhatwedidComponent } from './components/whatwedid/whatwedid.component';
import { TestimonyComponent } from './components/testimony/testimony.component';
import { CourseServiceService } from './services/course-service.service';
import { ContactComponent } from './contact/contact.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseDetailPageComponent } from './course-detail-page/course-detail-page.component';
import { ContactService } from './services/contact.service';
import { FileDownloadService } from './services/file-download.service';
import { FilterPipe } from './components/filter.pipe';
import { CorporateTrainingComponent } from './corporate-training/corporate-training.component';
import { EmployerComponent } from './employer/employer.component';
import { InstructorComponent } from './instructor/instructor.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UtilService } from './services/util.service';
import { CompaniesComponent } from './components/companies/companies.component';
import {TabComponent, TabsComponent, OnTabDeselect, OnTabSelect} from './components/tab-component/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    BannerImageComponent,
    PageHeaderComponent,
    CourseListComponent,
    CourseTileComponent,
    StarRatingComponent,
    ContactComponent,
    WhatwedidComponent,
    TestimonyComponent,
    CoursesPageComponent,
    CourseDetailPageComponent,
    FilterPipe,
    CorporateTrainingComponent,
    EmployerComponent,
    InstructorComponent,
    CarouselComponent,
    CompaniesComponent,
    TabComponent, TabsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'courses', component: CoursesPageComponent, pathMatch: 'full' },
      { path: 'courses/:name', component: CourseDetailPageComponent, pathMatch: 'full' },
      { path: 'contact', component: ContactComponent, pathMatch: 'full'},
      { path: 'about', component: AboutComponent, pathMatch: 'full' },
      { path: 'corporatetraining', component: CorporateTrainingComponent, pathMatch: 'full' },
      { path: 'employer', component: EmployerComponent, pathMatch: 'full' },
      { path: 'instructor', component: InstructorComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'home' }
    ]),
    HttpModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    NguCarouselModule
  ],
  exports: [RouterModule],
  providers: [CourseServiceService, ContactService, FileDownloadService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
