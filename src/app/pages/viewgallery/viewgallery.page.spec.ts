import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewgalleryPage } from './viewgallery.page';

describe('ViewgalleryPage', () => {
  let component: ViewgalleryPage;
  let fixture: ComponentFixture<ViewgalleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewgalleryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewgalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
