import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Announcement } from '../templates/announcement';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  public selectedAnnouncement: Announcement;
  private image: string = "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80";
  private announcements: Announcement[] = [
    {
      id: '1',
      title: 'Test Accouncement 1',
      message: 'This is a test description to make sure the anncouncement card looks presentable. This specific descriprion is needed to be quite large so I can show how the second custom pipe removes words until the character limit is reached. Of course it does not split the last word in half, it just goes to the last possible full word before the cut-off. I want to end my existance, this is a cry for help.',
      author: 'My Ego',
      categoryId: 'General',
      imageUrl: this.image,

    },
    {
      id: '2',
      title: 'Test Accouncement 2',
      message: 'This is a test description to make sure the anncouncement card looks presentable',
      author: 'My Ego',
      categoryId: 'Course',
      imageUrl: this.image,

    },
    {
      id: '3',
      title: 'Test Accouncement 3',
      message: 'This is a test description to make sure the anncouncement card looks presentable',
      author: 'My Ego',
      categoryId: 'Laboratory',
      imageUrl: this.image,

    },
    {
      id: '4',
      title: 'Test Accouncement 4',
      message: 'This is a test description to make sure the anncouncement card looks presentable',
      author: 'My Alter Ego',
      categoryId: 'General',
      imageUrl: this.image,

    },
    {
      id: '5',
      title: 'Test Accouncement 5',
      message: 'This is a test description to make sure the anncouncement card looks presentable',
      author: 'My Alter Ego',
      categoryId: 'Course',
      imageUrl: this.image,

    },
    {
      id: '6',
      title: 'Test Accouncement 6',
      message: 'This is a test description to make sure the anncouncement card looks presentable',
      author: 'My Alter Ego',
      categoryId: 'Laboratory',
      imageUrl: this.image,

    },
    {
      id: '7',
      title: 'Test Accouncement 7',
      message: 'This is a test description to make sure the anncouncement card looks presentable',
      author: 'The Voices',
      categoryId: 'General',
      imageUrl: this.image,

    },
    {
      id: '8',
      title: 'Test Accouncement 8',
      message: 'This is a test description to make sure the anncouncement card looks presentable',
      author: 'The Voices',
      categoryId: 'Course',
      imageUrl: this.image,

    },
    {
      id: '9',
      title: 'Test Accouncement 9',
      message: 'This is a test description to make sure the anncouncement card looks presentable',
      author: 'The Voices',
      categoryId: 'Laboratory',
      imageUrl: this.image,

    },
    {
      id: '10',
      title: 'Test Accouncement 10',
      message: 'This is a test description to make sure the anncouncement card looks presentable',
      author: 'Please End Me',
      categoryId: 'General',
      imageUrl: this.image,

    },

  ]
  private announcementSubject: BehaviorSubject<Announcement[]> = new BehaviorSubject<Announcement[]>(this.announcements);

  private readonly baseURL: string = "http://localhost:7185";
  //"https://newsapi20221108120432.azurewebsites.net/api/Announcements";
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  constructor(private httpClient: HttpClient) { }

  getAnnouncements(): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(this.baseURL + "/Get/All", this.httpOptions);
  }

  getNumberOfAnnouncements(): Observable<number> {
    return this.httpClient.get<Announcement[]>(this.baseURL + "/Get/All", this.httpOptions).pipe(
      map(announcements => announcements.length)
    );
  }

  getCategories() {
    let listOfCategories: string[] = [];

    this.httpClient.get<Announcement[]>(this.baseURL + "/Get/All", this.httpOptions).forEach(
      a => {
        for (let i = 0; i < a.length; i++) {

          if (listOfCategories.indexOf(a[i].categoryId) == -1) {
            listOfCategories.push(a[i].categoryId);
          }
        }
      }
    )
    return listOfCategories;

    // for (let i = 0; i < this.announcements.length; i++) {

    //   if (listOfCategories.indexOf(this.announcements[i].categoryId) == -1) {
    //     listOfCategories.push(this.announcements[i].categoryId);
    //   }
    // }

  }

  addAnnouncement(announcement: Announcement): Observable<Announcement> {
    //this.announcementsFromApp.push(announcement);
    return this.httpClient.post<Announcement>(
      this.baseURL + "/Post",
      announcement,
      this.httpOptions
    );
  }

  updateAnnouncement(announcement: Announcement, id: string) {
    return this.httpClient.put<Announcement>(
      this.baseURL + "/Put/" + id,
      announcement,
      this.httpOptions
    )
  }

  removeAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.httpClient.delete<Announcement>(
      this.baseURL + "/Delete/" + announcement.id,
      this.httpOptions
    );
  }

  getNumberofAnnouncements() {
    return this.announcements.length;
  }

  getDefaultAnnouncements() {
    return this.announcementSubject.asObservable();
  }

  addDefualtAnnouncement(announcement: Announcement) {
    this.announcements.push(announcement);
    this.announcementSubject.next(this.announcements);
  }

  updateDefaultAnnouncement(anncouncement: Announcement) {
    const index = this.announcements.findIndex(a => a.id == anncouncement.id);
    if (index !== -1) {
      this.announcements[index] = anncouncement;
      this.announcementSubject.next(this.announcements);
    }
    else {
      this.addDefualtAnnouncement(anncouncement);
    }
  }

  deleteDefaultAnncouncement(anncouncement: Announcement) {
    const index = this.announcements.findIndex(a => a.id == anncouncement.id);
    if (index !== -1) {
      this.announcements.splice(index, 1);
      this.announcementSubject.next(this.announcements);
    }
    else {
      console.error("Announcement not found.");
    }
  }

  getDefaultCategories() {
    let listOfCategories: string[] = [];
    for (let i = 0; i < this.announcements.length; i++) {

      if (listOfCategories.indexOf(this.announcements[i].categoryId) == -1) {
        listOfCategories.push(this.announcements[i].categoryId);
      }
    }

    return listOfCategories;
  }
}
