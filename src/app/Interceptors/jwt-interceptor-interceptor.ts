import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../AuthServices/token-service';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenservice = inject(TokenService)
  const token = tokenservice.gettoken()
  // Attach token to every request
  const authReq = token ? req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  }) : req;
  return next(authReq);
};
