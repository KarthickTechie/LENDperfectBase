import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoGalleryPage } from './video-gallery.page';

describe('VideoGalleryPage', () => {
  let component: VideoGalleryPage;
  let fixture: ComponentFixture<VideoGalleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoGalleryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
