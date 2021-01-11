import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QueryinboxPage } from './queryinbox.page';

describe('QueryinboxPage', () => {
  let component: QueryinboxPage;
  let fixture: ComponentFixture<QueryinboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryinboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QueryinboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
