import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppAnnouncementFormComponent } from './app-announcement-form/app-announcement-form.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';


const routes: Routes =
  [
    {
      path: 'add',
      component: AppAnnouncementFormComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: '**',
      redirectTo: 'home'
    }
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forRoot(routes)]
})
export class AppRoutingModule {

}
