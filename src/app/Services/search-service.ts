import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Suggestioninterface } from '../Interfaces/suggestioninterface';
import { PagedResult, ProductInterface } from '../Interfaces/product-interface';
import { Observable } from 'rxjs';
import { ProductResponse } from '../Interfaces/searchlayout-interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  http = inject(HttpClient);

  getSuggestionResult(Query:string ){
    const url = `https://uecommercestore.runasp.net/SearchSuggestions?searchSuggestion=${Query}`;
   return this.http.get<Suggestioninterface[]>(url)
  }
  getSearchedProducts(pageNumber:number,pageSize:number,searchTerm:string,sortBy:string,SortDescending:boolean): Observable<ProductResponse>{
    const url = `https://uecommercestore.runasp.net/Products`;
    const params = new HttpParams()
    .set('PageNumber',pageNumber.toString())
    .set('PageSize',pageSize.toString())
    .set('SearchTerm',searchTerm)
    .set('SortBy',sortBy.toLocaleLowerCase())
    .set('SortDecending',SortDescending);
    const res = this.http.get<ProductResponse>(url,{params})
    return res;
  }
}
