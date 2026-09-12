import { inject, Injectable } from '@angular/core';
import { CartItemsInterface } from '../Interfaces/cart-items-interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient)
  getCartItems(cartId: number): Observable<CartItemsInterface[]> {
    const url = `https://uecommercestore.runasp.net/api/Cart/GetCartItems`;
    const queryparams = new HttpParams().set('cartId', cartId)
    return this.http.get<CartItemsInterface[]>(
      url, {
      params: queryparams
    }
    );
  }
  AddToCart(productId: number) {
    const url = `https://uecommercestore.runasp.net/api/Cart/AddItemToCart`;
    // 1. Define your request body payload
    const body = {
      id: 0,
      productId: productId,
      quantity: 1
    };
    const cartId = localStorage.getItem('CartId')
    const queryParams = new HttpParams().set('cartId', Number(cartId));
    return this.http.post(
      url, body, {
      params: queryParams
    })
  }
  DeleteItemFromCart(cartId: number, productId: number) {
    const url = `https://uecommercestore.runasp.net/api/Cart/RemoveItemFromCart`;
    const queryParams = new HttpParams()
      .set('cartId', Number(cartId))
      .set('productId', productId)
    return this.http.delete(url, {
      params: queryParams
    })
  }
}
