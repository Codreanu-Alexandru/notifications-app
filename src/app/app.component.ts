import { Component } from '@angular/core';
import { Announcement } from './templates/announcement';
import { Category } from './templates/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notifications-app';

  announcementsFromApp: Announcement[] =
    [
      {
        title: 'test title 1',
        message: 'test message 1',
        author: 'cosmin 1',
        categoryId: '1',
        imageUrl: 'google.com',
        id: '1'
      },
      {
        title: 'test title 2',
        message: 'test message 2',
        author: 'cosmin 2',
        categoryId: '1',
        imageUrl: 'youtube.com',
        id: '2'
      }
    ]

  filteredAnnouncements: Announcement[] = this.announcementsFromApp;

  filterAnnouncements(selectedCategory: Category) {
    // this.announcementsFromApp.filter(announcement =>
    //   {
    //     return announcement.categoryObject.id == selectedCategory.id;
    //   })
    // or
    if (!selectedCategory) {
      this.filteredAnnouncements = this.announcementsFromApp;

      return;
    }

    this.filteredAnnouncements = this.announcementsFromApp.filter
      (announcement =>
        announcement.categoryId === selectedCategory.id.toString()
      );
  }
}

