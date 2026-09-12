import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cartgardGuard } from './cartgard-guard';

describe('cartgardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => cartgardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
