import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../templates/announcement';
import { AnnouncementService } from '../services/announcement.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  //template: '', //cod html
  styleUrls: ['./announcements.component.scss'],
  styles: ['p { color: red;}']
})
export class AnnouncementsComponent {
  @Input() announcement: Announcement;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  isHovered: boolean;
  constructor(private announcementService: AnnouncementService) { };

  deleteAnnouncement() {
    this.delete.emit(this.announcement.id);
    this.announcementService.removeAnnouncement(this.announcement).subscribe();
  }

  onClickEdit(selectedAnnouncement: Announcement): void {
    this.announcementService.selectedAnnouncement = selectedAnnouncement;
  }

}
