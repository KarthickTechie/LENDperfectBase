import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CibilCheckPage } from './cibil-check.page';

describe('CibilCheckPage', () => {
  let component: CibilCheckPage;
  let fixture: ComponentFixture<CibilCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibilCheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CibilCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
