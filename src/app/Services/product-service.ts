import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult, ProductInterface } from '../Interfaces/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http:HttpClient ){}
  url:string = "https://uecommercestore.runasp.net/Products"

    getProducts(pageNumber: number, pageSize: number): Observable<PagedResult<ProductInterface>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResult<ProductInterface>>(this.url, { params });
  }
}
