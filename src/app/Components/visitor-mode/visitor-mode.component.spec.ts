import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorModeComponent } from './visitor-mode.component';

describe('VisitorModeComponent', () => {
  let component: VisitorModeComponent;
  let fixture: ComponentFixture<VisitorModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
