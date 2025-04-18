import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '.././auth.service';
import { inject } from '@angular/core';

export const loginPreventGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged()) {
    return router.createUrlTree(['/notes']);
  }

  return !authService.isLogged();
};
