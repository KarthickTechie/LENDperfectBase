import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpletitlecontainerComponent } from './simpletitlecontainer.component';

describe('SimpletitlecontainerComponent', () => {
  let component: SimpletitlecontainerComponent;
  let fixture: ComponentFixture<SimpletitlecontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpletitlecontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpletitlecontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
