import { ScrollPositionService } from './../../Services/scroll-position-service';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../../Interfaces/product-interface';
import { ProductService } from '../../Services/product-service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-products-layout',
  imports: [ButtonModule, DataViewModule, TagModule, CommonModule,
            SelectButtonModule, FormsModule, PaginatorModule, ProgressBarModule],
  templateUrl: './products-layout.html',
  styleUrl: './products-layout.css',
   providers: [MessageService]
})
export class ProductsLayout implements OnInit, AfterViewInit, OnDestroy {

  private productService = inject(ProductService);
  public ScrollPositionService = inject(ScrollPositionService)
  private messageService = inject(MessageService);
  products = signal<ProductInterface[]>([]);
  router = inject(Router)
  route = inject(ActivatedRoute)
  options: any[] = ['list', 'grid'];
  layout: 'list' | 'grid' = 'grid';
  loading = signal(true);
  error = signal<string | null>(null);
  first: number = 0;
  rows: number = 10;
  totalRecords = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const page = Number(params['page']) || 1;

      this.first = (page - 1) * this.rows;

      this.loadProducts(page);
    });
  }
  private scrollPosition = 0;

  @HostListener('window:scroll')
  onScroll() {
    this.scrollPosition = window.scrollY;
  }

  ngOnDestroy() {
    sessionStorage.setItem(
      'home-scroll-position',
      this.scrollPosition.toString()
    );
  }

  ngAfterViewInit() {
    const position = sessionStorage.getItem('home-scroll-position');

    if (position) {
      setTimeout(() => {
        window.scrollTo(0, Number(position));
      }, 100);
    }
  }

  loadProducts(page: number) {
    this.loading.set(true);

    this.productService.getProducts(page, this.rows).subscribe({
      next: (data) => {
        this.products.set(data.items);
        this.totalRecords = data.totalCount;
        this.rows = data.pageSize;
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products');
        this.loading.set(false);
      }
    });
  }

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? this.rows;

    const page = Math.floor(this.first / this.rows) + 1;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page }
    });
  }

  getMainImage(product: ProductInterface): string {
    const main = product.images.find(img => img.isMain);
    return main?.url ?? product.images[0]?.url ?? 'assets/placeholder.png';
  }


  getSeverity(stockQuantity: number): 'success' | 'warn' | 'danger' | 'info' {
    if (stockQuantity > 10) {
      return 'success';   // plenty in stock
    } else if (stockQuantity > 0) {
      return 'warn';      // low stock
    } else {
      return 'danger';    // out of stock
    }
  }



  GotoDetails(id: number) {
    this.router.navigate(['/product-details', id])
  }

  //    @HostListener('window:scroll')
  //   onScroll() {
  //     this.ScrollPositionService.savePosition(
  //       '',
  //       window.scrollY
  //     );
  //   }

  //   ngOnDestroy() {
  //     this.ScrollPositionService.savePosition(
  //       '',
  //       window.scrollY
  //     );
  //   }
  //   ngAfterViewInit() {
  //   const position =
  //     this.ScrollPositionService.getPosition('');

  //   setTimeout(() => {
  //     window.scrollTo({
  //       top: position,
  //       behavior: 'instant'
  //     });
  //   });
  // }
}

