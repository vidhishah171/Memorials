import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassActivePopComponent } from './forgot-pass-active-pop.component';

describe('ForgotPassActivePopComponent', () => {
  let component: ForgotPassActivePopComponent;
  let fixture: ComponentFixture<ForgotPassActivePopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPassActivePopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassActivePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
