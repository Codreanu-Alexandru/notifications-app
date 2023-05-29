import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../templates/category';
import { AnnouncementService } from '../services/announcement.service';
import { Announcement } from '../templates/announcement';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Output() selectCategoryEmitter = new EventEmitter<string>();

  selectedCategory: string;
  listOfCategories: string[];

  constructor(private announcementService: AnnouncementService) {
    this.listOfCategories = announcementService.getCategories();
    this.listOfCategories.push('Reset');

  }

  selectCategory(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    this.emitSelectedCategory();
  }

  emitSelectedCategory() {
    this.selectCategoryEmitter.emit(this.selectedCategory);
  }

  resetFilters() {
    this.selectedCategory = undefined;
    this.emitSelectedCategory();
  }
}

