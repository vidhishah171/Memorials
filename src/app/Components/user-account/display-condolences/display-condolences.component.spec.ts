import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCondolencesComponent } from './display-condolences.component';

describe('DisplayCondolencesComponent', () => {
  let component: DisplayCondolencesComponent;
  let fixture: ComponentFixture<DisplayCondolencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCondolencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCondolencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
