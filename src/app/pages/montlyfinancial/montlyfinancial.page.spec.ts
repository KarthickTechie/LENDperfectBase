import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MontlyfinancialPage } from './montlyfinancial.page';

describe('MontlyfinancialPage', () => {
  let component: MontlyfinancialPage;
  let fixture: ComponentFixture<MontlyfinancialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontlyfinancialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MontlyfinancialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
