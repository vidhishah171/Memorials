import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToUserContactComponent } from './user-to-user-contact.component';

describe('UserToUserContactComponent', () => {
  let component: UserToUserContactComponent;
  let fixture: ComponentFixture<UserToUserContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserToUserContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserToUserContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
