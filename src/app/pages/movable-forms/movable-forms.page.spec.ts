import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovableFormsPage } from './movable-forms.page';

describe('MovableFormsPage', () => {
  let component: MovableFormsPage;
  let fixture: ComponentFixture<MovableFormsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovableFormsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovableFormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
