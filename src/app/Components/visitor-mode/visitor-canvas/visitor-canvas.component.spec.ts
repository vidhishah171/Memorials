import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorCanvasComponent } from './visitor-canvas.component';

describe('VisitorCanvasComponent', () => {
  let component: VisitorCanvasComponent;
  let fixture: ComponentFixture<VisitorCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
