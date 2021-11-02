import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassPopupComponent } from './forgot-pass-popup.component';

describe('ForgotPassPopupComponent', () => {
  let component: ForgotPassPopupComponent;
  let fixture: ComponentFixture<ForgotPassPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPassPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
