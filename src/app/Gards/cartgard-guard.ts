import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../AuthServices/token-service';

export const cartgardGuard: CanActivateFn = (route, state) => {
  const tokenservice = inject(TokenService)
  if(tokenservice.isLoggedin()){
    return true;
  }else{
    return false;
  }
};
