import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CropDocComponent } from './crop-doc.component';

describe('CropDocComponent', () => {
  let component: CropDocComponent;
  let fixture: ComponentFixture<CropDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropDocComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CropDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
