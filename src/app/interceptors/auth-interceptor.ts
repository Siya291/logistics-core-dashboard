import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      console.log('Attaching Token to:', req.url);
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next(authReq);
    }
  }

  console.warn('No token found for request:', req.url);
  return next(req);
};
