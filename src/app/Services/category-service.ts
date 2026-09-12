import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { categoriesInterface } from '../Interfaces/product-interface';
import { Observable } from 'rxjs';
import { CategorylayoutInterface } from '../Interfaces/categorylayout-interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  url:string = "https://uecommercestore.runasp.net/categoriesNames";

  getCategoriesNames():Observable<categoriesInterface[]>{
   return this.http.get<categoriesInterface[]>(this.url);
  }

  getCategoriesById(id:string|null){
    const url =  `https://uecommercestore.runasp.net/categoryById?categoryId=${id}`;
    const result = this.http.get<CategorylayoutInterface>(url)
    return result;
  }
}
