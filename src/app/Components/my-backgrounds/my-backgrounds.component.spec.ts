import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBackgroundsComponent } from './my-backgrounds.component';

describe('MyBackgroundsComponent', () => {
  let component: MyBackgroundsComponent;
  let fixture: ComponentFixture<MyBackgroundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBackgroundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBackgroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
