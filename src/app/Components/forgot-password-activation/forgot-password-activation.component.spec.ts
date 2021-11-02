import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordActivationComponent } from './forgot-password-activation.component';

describe('ForgotPasswordActivationComponent', () => {
  let component: ForgotPasswordActivationComponent;
  let fixture: ComponentFixture<ForgotPasswordActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
