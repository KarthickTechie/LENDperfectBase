import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExistingApplicationPage } from './existing-application.page';

describe('ExistingApplicationPage', () => {
  let component: ExistingApplicationPage;
  let fixture: ComponentFixture<ExistingApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExistingApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
