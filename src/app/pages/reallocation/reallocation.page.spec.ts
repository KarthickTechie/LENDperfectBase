import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReallocationPage } from './reallocation.page';

describe('ReallocationPage', () => {
  let component: ReallocationPage;
  let fixture: ComponentFixture<ReallocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReallocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReallocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
