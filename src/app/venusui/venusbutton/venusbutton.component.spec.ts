import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenusbuttonComponent } from './venusbutton.component';

describe('VenusbuttonComponent', () => {
  let component: VenusbuttonComponent;
  let fixture: ComponentFixture<VenusbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenusbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenusbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
