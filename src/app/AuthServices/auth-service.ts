import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { loginInterface, registerInterface, SigninResponseInterface, signupResponseInterface } from '../Interfaces/auth-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient)

  login(payload:loginInterface){
   const url = `https://uecommercestore.runasp.net/api/Auth/login/`;
   const result = this.http.post<SigninResponseInterface>(url,payload)
   return result
  }
  register(payload:registerInterface){
    const url = `https://uecommercestore.runasp.net/api/Auth/register`;
    const result = this.http.post<signupResponseInterface>(url,payload)
    return result
  }





}
