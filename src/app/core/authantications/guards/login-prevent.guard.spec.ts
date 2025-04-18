import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginPreventGuard } from './login-prevent.guard';

describe('loginPreventGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginPreventGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
