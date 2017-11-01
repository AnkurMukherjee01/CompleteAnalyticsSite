import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'contact', component: ContactComponent, pathMatch: 'full'},
      { path: 'about', component: AboutComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ]),
    HttpModule,
  ],
  exports: [RouterModule],
  providers: [CourseServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
