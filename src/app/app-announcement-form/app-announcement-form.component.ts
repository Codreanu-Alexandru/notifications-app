import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../templates/category';
import { AnnouncementService } from '../services/announcement.service';
import { Announcement } from '../templates/announcement';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-app-announcement-form',
  templateUrl: './app-announcement-form.component.html',
  styleUrls: ['./app-announcement-form.component.scss']
})
export class AppAnnouncementFormComponent implements OnInit {
  announcement: Announcement;
  title: string;
  author: string;
  message: string;
  imageUrl: string;
  category: string;
  listOfCategories: string[];
  modify: boolean = false;

  constructor(private announcementService: AnnouncementService, private route: ActivatedRoute) {
    this.listOfCategories = announcementService.getCategories();
  }
  ngOnInit(): void {
    this.announcement = this.announcementService.selectedAnnouncement;
    if (this.announcement != undefined) {
      this.modify = true;
      this.title = this.announcement.title;
      this.message = this.announcement.message;
      this.imageUrl = this.announcement.imageUrl;
      this.author = this.announcement.author;
      this.category = this.announcement.categoryId;
      this.announcementService.selectedAnnouncement = undefined;
    }
  }

  writeToConsole() {
    console.log('title :' + this.title + '\n' +
      'author :' + this.author + '\n' +
      'message :' + this.message + '\n' +
      'imageUrl :' + this.imageUrl + '\n' +
      'category :' + this.category + '\n');
  }

  addComponent() {
    if (!this.modify) {
      let newId;
      this.announcementService.getNumberOfAnnouncements().subscribe(
        (numberOfAnnouncements: number) => {
          newId = numberOfAnnouncements + 1;
        }
      )

      this.announcementService.addAnnouncement({
        title: this.title,
        id: newId,
        message: this.message,
        author: this.author,
        categoryId: this.category,
        imageUrl: this.imageUrl,
      }).subscribe();
    }
    else {
      let updatedAnnounement: Announcement = {
        title: this.title,
        id: this.announcement.id,
        message: this.message,
        imageUrl: this.imageUrl,
        categoryId: this.category,
        author: this.author
      };

      this.announcementService.updateAnnouncement(updatedAnnounement, updatedAnnounement.id).subscribe();
    }

    this.writeToConsole();
  }
}
