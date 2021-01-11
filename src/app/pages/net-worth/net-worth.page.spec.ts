import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NetWorthPage } from './net-worth.page';

describe('NetWorthPage', () => {
  let component: NetWorthPage;
  let fixture: ComponentFixture<NetWorthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetWorthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NetWorthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
