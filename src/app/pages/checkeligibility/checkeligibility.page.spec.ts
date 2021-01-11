import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckeligibilityPage } from './checkeligibility.page';

describe('CheckeligibilityPage', () => {
  let component: CheckeligibilityPage;
  let fixture: ComponentFixture<CheckeligibilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckeligibilityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckeligibilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
