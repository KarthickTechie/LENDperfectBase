import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreinspectionPage } from './preinspection.page';

describe('PreinspectionPage', () => {
  let component: PreinspectionPage;
  let fixture: ComponentFixture<PreinspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreinspectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreinspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
