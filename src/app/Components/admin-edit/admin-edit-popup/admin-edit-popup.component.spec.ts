import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPopupComponent } from './admin-edit-popup.component';

describe('AdminEditPopupComponent', () => {
  let component: AdminEditPopupComponent;
  let fixture: ComponentFixture<AdminEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
