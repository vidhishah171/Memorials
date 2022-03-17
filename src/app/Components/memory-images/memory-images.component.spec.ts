import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryImagesComponent } from './memory-images.component';

describe('MemoryImagesComponent', () => {
  let component: MemoryImagesComponent;
  let fixture: ComponentFixture<MemoryImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
