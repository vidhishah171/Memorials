import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemorialComponent } from './edit-memorial.component';

describe('EditMemorialComponent', () => {
  let component: EditMemorialComponent;
  let fixture: ComponentFixture<EditMemorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMemorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
