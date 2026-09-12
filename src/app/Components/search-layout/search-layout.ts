import { SearchService } from './../../Services/search-service';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, map, switchMap, tap } from 'rxjs';
import { ProductItem } from '../../Interfaces/searchlayout-interface';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-search-layout',
  imports: [
    ButtonModule,
    DataViewModule,
    TagModule,
    CommonModule,
    PaginatorModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './search-layout.html',
  styleUrl: './search-layout.css',
})
export class SearchLayout {
  private searchService = inject(SearchService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  imageBaseUrl = 'https://localhost:7074';

  first = 0;
  rows = 5;
  totalRecords = 0;

  /** Tracks the last search term seen so we can reset to page 1 when it changes. */
  private lastSearch: string | null = null;

  products$ = this.route.paramMap.pipe(
    switchMap(params => {
      const search = params.get('srh') ?? '';

      return this.route.queryParamMap.pipe(
        switchMap(queryParams => {
          const pageFromUrl = Number(queryParams.get('page')) || 1;

          // If the search term changed, reset the page in the URL to 1.
          // The navigate() call below will trigger a fresh emission with page=1,
          // so we skip fetching here and let that emission do the work.
          if (this.lastSearch !== null && this.lastSearch !== search && pageFromUrl !== 1) {
            this.lastSearch = search;
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { page: 1 },
              queryParamsHandling: 'merge',
            });
            return EMPTY;
          }
          this.lastSearch = search;

          this.first = (pageFromUrl - 1) * this.rows;

          return this.searchService
            .getSearchedProducts(pageFromUrl, this.rows, search, 'price', false)
            .pipe(
              tap(res => (this.totalRecords = res.totalCount)),
              map(res => res.items)
            );
        })
      );
    })
  );

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;
    const page = Math.floor(this.first / this.rows) + 1;

    // Reflect the page in the URL, e.g. http://localhost:4200/?page=2
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  inventorystatus(product: ProductItem): string {
    if (product.stockQuantity > 10) {
      return 'in stock';
    } else if (product.stockQuantity > 0) {
      return 'low stock';
    } else {
      return 'out of stock';
    }
  }

  getMainImage(product: ProductItem): string {
    const main = product.images.find(img => img.isMain);
    return main?.url ?? product.images[0]?.url ?? 'assets/placeholder.png';
  }

  getSeverity(stockQuantity: number): 'success' | 'warn' | 'danger' | 'info' {
    if (stockQuantity > 10) {
      return 'success'; // plenty in stock
    } else if (stockQuantity > 0) {
      return 'warn'; // low stock
    } else {
      return 'danger'; // out of stock
    }
  }

  GotoDetails(id: number): void {
    this.router.navigate(['/product-details', id]);
  }
}
