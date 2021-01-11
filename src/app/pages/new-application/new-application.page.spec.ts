import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewApplicationPage } from './new-application.page';

describe('NewApplicationPage', () => {
  let component: NewApplicationPage;
  let fixture: ComponentFixture<NewApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
