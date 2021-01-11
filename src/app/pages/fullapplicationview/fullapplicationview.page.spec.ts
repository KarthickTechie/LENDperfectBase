import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullapplicationviewPage } from './fullapplicationview.page';

describe('FullapplicationviewPage', () => {
  let component: FullapplicationviewPage;
  let fixture: ComponentFixture<FullapplicationviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullapplicationviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FullapplicationviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
