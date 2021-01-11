import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssetFormPage } from './asset-form.page';

describe('AssetFormPage', () => {
  let component: AssetFormPage;
  let fixture: ComponentFixture<AssetFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
