import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtpcheckComponent } from './otpcheck.component';

describe('OtpcheckComponent', () => {
  let component: OtpcheckComponent;
  let fixture: ComponentFixture<OtpcheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpcheckComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
