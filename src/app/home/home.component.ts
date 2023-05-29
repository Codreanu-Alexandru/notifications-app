import { Component } from '@angular/core';
import { Announcement } from '../templates/announcement';
import { Category } from '../templates/category';
import { AnnouncementService } from '../services/announcement.service';
import { SelectorContext } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  title = 'notifications-app';
  currentCategory: string;
  filteredAnnouncements: Announcement[];

  constructor(private announcementService: AnnouncementService) {
    //const observer = {
    //next: aux => console.log(aux),
    //error: aux => console.error("error for " + aux),
    //complete: () => console.log("Done."),
    //};

    // this.announcementService.getNumberOfAnnouncements().subscribe(
    //   (numberOfAnnouncements: number) => {
    //     // Use the number value in your application
    //     console.log(numberOfAnnouncements);
    //   },
    //   (error: any) => {
    //     // Handle any errors that occur during the request
    //     console.error('An error occurred:', error);
    //   }
    // );

    // this.announcementService.getDefaultAnnouncements().subscribe(announcement => {
    //   this.filteredAnnouncements = announcement;
    // });

    this.announcementService.getAnnouncements().subscribe(a => this.filteredAnnouncements = a);
    this.currentCategory = 'Reset';
    this.filterAnnouncements('Reset');

  }

  ngOnInit() {
    this.filterAnnouncements('Reset');
  }


  filterAnnouncements(selectedCategory: string) {

    // this.announcementsFromApp.filter(announcement =>
    //   {
    //     return announcement.categoryObject.id == selectedCategory.id;
    //   })
    // or
    //call la metoda din serviciu

    this.currentCategory = selectedCategory;
    if (!selectedCategory) {
      this.announcementService.getAnnouncements().subscribe(announcement => {
        this.filteredAnnouncements = announcement;
      })
    }
    else {
      if (selectedCategory == 'Reset') {
        this.resetAnnouncements();
      }
      else {
        this.announcementService.getAnnouncements().subscribe(announcement => {
          console.log(selectedCategory);
          this.filteredAnnouncements = announcement.filter
            (x =>
              x.categoryId == selectedCategory)
        })
      }
    }

    // if (!selectedCategory) {
    //   if (selectedCategory == 'Reset') {
    //     this.resetAnnouncements();
    //   }
    //   else {
    //     this.announcementService.getDefaultAnnouncements().subscribe(a => {
    //       this.filteredAnnouncements = a.filter(x => x.categoryId == selectedCategory);
    //     })
    //   }
    // }
  }

  resetAnnouncements() {
    this.announcementService.getAnnouncements().subscribe(a => {
      this.filteredAnnouncements = a;
    })
  }

  onDeleteAnnouncement(param: any) {
    this.filterAnnouncements(this.currentCategory);
  }
}
