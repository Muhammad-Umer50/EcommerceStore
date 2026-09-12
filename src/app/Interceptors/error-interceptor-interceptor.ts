import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
   const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        // Option A: Redirect to a dedicated 500 error page
       // router.navigate(['']);

        // Option B: Or trigger a global notification UI/Toast
        console.error('Server side 500 error occurred:', error.message);
      }

      // Pass the error along to individual services if they want to handle it locally
      return throwError(() => error);
    })
  );
};
