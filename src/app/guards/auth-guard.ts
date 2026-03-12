import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  // Only check localStorage if we are in the browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('jwt_token');
    if (token) return true;
  }

  // Redirect to login if no token or not in browser
  return router.parseUrl('/login');
};
