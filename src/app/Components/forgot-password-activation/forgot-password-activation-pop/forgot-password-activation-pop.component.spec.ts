import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordActivationPopComponent } from './forgot-password-activation-pop.component';

describe('ForgotPasswordActivationPopComponent', () => {
  let component: ForgotPasswordActivationPopComponent;
  let fixture: ComponentFixture<ForgotPasswordActivationPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordActivationPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordActivationPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
