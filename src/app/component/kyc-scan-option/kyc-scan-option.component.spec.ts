import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KycScanOptionComponent } from './kyc-scan-option.component';

describe('KycScanOptionComponent', () => {
  let component: KycScanOptionComponent;
  let fixture: ComponentFixture<KycScanOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycScanOptionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KycScanOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
