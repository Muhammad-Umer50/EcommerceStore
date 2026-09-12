import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../Services/category-service';
import { map, Observable, switchMap } from 'rxjs';
import { CategorylayoutInterface, Product } from '../../Interfaces/categorylayout-interface';
import { ButtonModule } from 'primeng/button';
import { DataViewModule, DataViewPageEvent } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-layout',
  imports: [ButtonModule, DataViewModule, TagModule, CommonModule],
  templateUrl: './category-layout.html',
  styleUrl: './category-layout.css',
})
export class CategoryLayout implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(CategoryService);
  private router = inject(Router);

  imageBaseUrl = 'https://localhost:7074';
  products$!: Observable<Product[]>;

  rows = 5;
  first = signal(0);

  ngOnInit(): void {
    this.products$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.service.getCategoriesById(id);
      }),
      map(result => result.products)
    );

    // Restore page from the URL query param (survives back-navigation, refresh, deep links)
    const savedPage = Number(this.route.snapshot.queryParamMap.get('page')) || 0;
    this.first.set(savedPage * this.rows);
  }

  onPageChange(event: DataViewPageEvent): void {
    this.first.set(event.first);

    const page = Math.floor(event.first / event.rows);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
      replaceUrl: true, // don't spam browser history with every page click
    });
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

  getMainImage(product: Product): string {
    const main = product.images.find(img => img.isMain);
    return main?.url ?? product.images[0]?.url ?? 'assets/placeholder.png';
  }

  inventorystatus(product: Product): string {
    if (product.stockQuantity > 10) {
      return 'in stock';
    } else if (product.stockQuantity > 0) {
      return 'low stock';
    } else {
      return 'out of stock';
    }
  }

  GotoDetails(id: number): void {
    this.router.navigate(['/product-details', id]);
  }
}
