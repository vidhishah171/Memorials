import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditExampleComponent } from './admin-edit-example.component';

describe('AdminEditExampleComponent', () => {
  let component: AdminEditExampleComponent;
  let fixture: ComponentFixture<AdminEditExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
