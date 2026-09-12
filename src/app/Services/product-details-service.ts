import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductdetailsInterface } from '../Interfaces/productdetails-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  http = inject(HttpClient)
  getDetails(id:string |null):Observable<ProductdetailsInterface>{
    const url = `https://uecommercestore.runasp.net/Products/${id}`;
    const res =  this.http.get<ProductdetailsInterface>(url);
    return res;
  }
}
