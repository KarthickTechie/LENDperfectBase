import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BureauPage } from './bureau.page';

describe('BureauPage', () => {
  let component: BureauPage;
  let fixture: ComponentFixture<BureauPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BureauPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BureauPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
