import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDecorationsComponent } from './my-decorations.component';

describe('MyDecorationsComponent', () => {
  let component: MyDecorationsComponent;
  let fixture: ComponentFixture<MyDecorationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDecorationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDecorationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
