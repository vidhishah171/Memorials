import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassAcitveComponent } from './forgot-pass-acitve.component';

describe('ForgotPassAcitveComponent', () => {
  let component: ForgotPassAcitveComponent;
  let fixture: ComponentFixture<ForgotPassAcitveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPassAcitveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassAcitveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
