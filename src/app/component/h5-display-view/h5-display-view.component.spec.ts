import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { H5DisplayViewComponent } from './h5-display-view.component';

describe('H5DisplayViewComponent', () => {
  let component: H5DisplayViewComponent;
  let fixture: ComponentFixture<H5DisplayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ H5DisplayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(H5DisplayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
