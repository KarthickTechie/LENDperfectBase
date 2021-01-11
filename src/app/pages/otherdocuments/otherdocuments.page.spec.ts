import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherdocumentsPage } from './otherdocuments.page';

describe('OtherdocumentsPage', () => {
  let component: OtherdocumentsPage;
  let fixture: ComponentFixture<OtherdocumentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherdocumentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherdocumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
