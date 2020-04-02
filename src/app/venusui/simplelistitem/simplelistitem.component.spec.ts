import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplelistitemComponent } from './simplelistitem.component';

describe('SimplelistitemComponent', () => {
  let component: SimplelistitemComponent;
  let fixture: ComponentFixture<SimplelistitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplelistitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplelistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
