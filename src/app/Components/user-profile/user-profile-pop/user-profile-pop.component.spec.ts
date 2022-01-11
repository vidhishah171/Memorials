import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePopComponent } from './user-profile-pop.component';

describe('UserProfilePopComponent', () => {
  let component: UserProfilePopComponent;
  let fixture: ComponentFixture<UserProfilePopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfilePopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
