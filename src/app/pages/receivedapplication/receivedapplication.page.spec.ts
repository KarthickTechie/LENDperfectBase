import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceivedapplicationPage } from './receivedapplication.page';

describe('ReceivedapplicationPage', () => {
  let component: ReceivedapplicationPage;
  let fixture: ComponentFixture<ReceivedapplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedapplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivedapplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
