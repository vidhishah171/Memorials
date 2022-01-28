import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmationPopupComponent } from './edit-confirmation-popup.component';

describe('EditConfirmationPopupComponent', () => {
  let component: EditConfirmationPopupComponent;
  let fixture: ComponentFixture<EditConfirmationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfirmationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
