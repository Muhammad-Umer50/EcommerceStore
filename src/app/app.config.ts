import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptorInterceptor } from './Interceptors/jwt-interceptor-interceptor';
import { errorInterceptorInterceptor } from './Interceptors/error-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled'
      })
    ),
    providePrimeNG({
      theme: {
        preset: Aura,
      }
    }),
    provideHttpClient(withInterceptors([jwtInterceptorInterceptor,errorInterceptorInterceptor]))
  ]
};
