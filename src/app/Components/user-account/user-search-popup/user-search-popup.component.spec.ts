import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchPopupComponent } from './user-search-popup.component';

describe('UserSearchPopupComponent', () => {
  let component: UserSearchPopupComponent;
  let fixture: ComponentFixture<UserSearchPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
