import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorCanvasNewComponent } from './visitor-canvas-new.component';

describe('VisitorCanvasNewComponent', () => {
  let component: VisitorCanvasNewComponent;
  let fixture: ComponentFixture<VisitorCanvasNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorCanvasNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorCanvasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
