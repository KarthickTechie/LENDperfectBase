import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasterupdatePage } from './masterupdate.page';

describe('MasterupdatePage', () => {
  let component: MasterupdatePage;
  let fixture: ComponentFixture<MasterupdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterupdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterupdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
