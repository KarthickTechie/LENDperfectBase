import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuditlogPage } from './auditlog.page';

describe('AuditlogPage', () => {
  let component: AuditlogPage;
  let fixture: ComponentFixture<AuditlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuditlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
