import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentUploadPage } from './document-upload.page';

describe('DocumentUploadPage', () => {
  let component: DocumentUploadPage;
  let fixture: ComponentFixture<DocumentUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentUploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
