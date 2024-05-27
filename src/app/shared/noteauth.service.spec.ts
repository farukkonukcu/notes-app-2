import { TestBed } from '@angular/core/testing';

import { NoteauthService } from './noteauth.service';

describe('NoteauthService', () => {
  let service: NoteauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
