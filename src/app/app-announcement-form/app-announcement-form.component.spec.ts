import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAnnouncementFormComponent } from './app-announcement-form.component';

describe('AppAnnouncementFormComponent', () => {
  let component: AppAnnouncementFormComponent;
  let fixture: ComponentFixture<AppAnnouncementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAnnouncementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAnnouncementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
