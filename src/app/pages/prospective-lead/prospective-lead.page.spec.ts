import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProspectiveLeadPage } from './prospective-lead.page';

describe('ProspectiveLeadPage', () => {
  let component: ProspectiveLeadPage;
  let fixture: ComponentFixture<ProspectiveLeadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectiveLeadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProspectiveLeadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
