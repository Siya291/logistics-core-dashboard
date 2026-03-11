import { HttpInterceptorFn } from '@angular/common/http';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const tenantId = 'vendor_delivery_co';

  const modifiedReq = req.clone({
    setHeaders: {
      'X-Tenant-ID': tenantId,
    },
  });

  return next(modifiedReq);
};
