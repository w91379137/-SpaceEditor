import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixiControlViewComponent } from './pixi-control-view.component';

describe('PixiControlViewComponent', () => {
  let component: PixiControlViewComponent;
  let fixture: ComponentFixture<PixiControlViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixiControlViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixiControlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
