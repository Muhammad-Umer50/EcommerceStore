import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateOrderInterface } from '../Interfaces/create-order-interface';
import { Observable } from 'rxjs';
import { GetOrderInterface } from '../Interfaces/get-order-interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient)
  CreateOrder(payload:CreateOrderInterface):Observable<CreateOrderInterface>{
    const url = `https://uecommercestore.runasp.net/api/Order/createOrder`
    return this.http.post<CreateOrderInterface>(url,payload)
  }
  GetOrders():Observable<GetOrderInterface[]>{
    const url = `https://uecommercestore.runasp.net/api/Order/getOrder`
    return this.http.get<GetOrderInterface[]>(url)
  }
}
