import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowupPage } from './followup.page';

describe('FollowupPage', () => {
  let component: FollowupPage;
  let fixture: ComponentFixture<FollowupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
