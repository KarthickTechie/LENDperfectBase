import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExistingPage } from './existing.page';

describe('ExistingPage', () => {
  let component: ExistingPage;
  let fixture: ComponentFixture<ExistingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExistingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
