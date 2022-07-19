import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDummyComponent } from './user-profile-dummy.component';

describe('UserProfileDummyComponent', () => {
  let component: UserProfileDummyComponent;
  let fixture: ComponentFixture<UserProfileDummyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileDummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
