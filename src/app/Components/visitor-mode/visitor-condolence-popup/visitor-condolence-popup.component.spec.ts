import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorCondolencePopupComponent } from './visitor-condolence-popup.component';

describe('VisitorCondolencePopupComponent', () => {
  let component: VisitorCondolencePopupComponent;
  let fixture: ComponentFixture<VisitorCondolencePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorCondolencePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorCondolencePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
