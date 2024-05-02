import { TestBed } from '@angular/core/testing';

import { GifLoaderService } from './gif-loader.service';

describe('GifLoaderService', () => {
  let service: GifLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
