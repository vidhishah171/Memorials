import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePremiunMemComponent } from './create-premiun-mem.component';

describe('CreatePremiunMemComponent', () => {
  let component: CreatePremiunMemComponent;
  let fixture: ComponentFixture<CreatePremiunMemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePremiunMemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePremiunMemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
