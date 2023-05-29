import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CategoriesComponent } from './categories/categories.component';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';
import { AppAnnouncementFormComponent } from './app-announcement-form/app-announcement-form.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AnnouncementService } from './services/announcement.service';
import { HttpClientModule } from '@angular/common/http';
import { DescriptionPipePipe } from './pipes/description-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsComponent,
    CategoriesComponent,
    CustomPipePipe,
    AppAnnouncementFormComponent,
    HomeComponent,
    DescriptionPipePipe, // new component added
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [AnnouncementService],
  bootstrap: [AppComponent]
})
export class AppModule { }