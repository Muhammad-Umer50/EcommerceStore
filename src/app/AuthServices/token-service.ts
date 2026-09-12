import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SigninResponseInterface } from '../Interfaces/auth-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
    constructor(private router: Router) {
    // Check token status if the user reloads the app
    this.autoLogoutOnRefresh();
  }
  saveAuthres(Authres:SigninResponseInterface){
    const token = Authres.token
    const email = Authres.email
    const CartId = Authres.cartId
   // localStorage.setItem("email",email)
    localStorage.setItem("token",token)
    localStorage.setItem("CartId",CartId)
  }
  gettoken(){
    const token = localStorage.getItem("token")
    return token;
  }
  getCartId(){
    const CartId = localStorage.getItem("CartId")
    return CartId;
  }

  isLoggedin(){
    if(!(this.gettoken() && this.getCartId())){
      return false
    }
    else{
      return true;
    }
  }
    // Clear local storage and state, then redirect
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem("CartId")
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.router.navigate(['/signin']);
  }

  private logoutTimer: any;
  private tokenKey = 'token';
  private emailkey = 'email';
    private scheduleAutoDelete(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiresAt = payload.exp * 1000; // Convert to milliseconds
      const timeout = expiresAt - Date.now();

      if (timeout > 0) {
        this.logoutTimer = setTimeout(() => {
          this.logout();
        }, timeout);
      } else {
        this.logout(); // Token is already expired
      }
    } catch (error) {
      this.logout(); // Fail-safe for malformed tokens
    }
  }

  // Handles cases where the user refreshes the browser mid-session
  private autoLogoutOnRefresh(): void {
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      this.scheduleAutoDelete(token);
    }
  }
}
