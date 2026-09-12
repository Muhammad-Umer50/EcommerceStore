import { AuthService } from './../../AuthServices/auth-service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { SearchService } from './../../Services/search-service';
import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import type { MenuItem } from 'primeng/api';
import { CategoryService } from '../../Services/category-service';
import { categoriesInterface } from '../../Interfaces/product-interface';
import { catchError, Observable } from 'rxjs';
import { Suggestioninterface } from '../../Interfaces/suggestioninterface';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpParams } from '@angular/common/http';
import { TokenService } from '../../AuthServices/token-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    AvatarModule,
    MenuModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    OverlayBadgeModule,
    RouterLinkActive,
    AutoCompleteModule,
    ButtonModule,
    ToastModule,
    RippleModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  providers: [MessageService]
})
export class Navbar implements OnInit {
  categoryService = inject(CategoryService);
  SearchService = inject(SearchService);
  TokenService = inject(TokenService);
  private messageService = inject(MessageService);
  router = inject(Router)
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  /** Number shown on the cart badge */
  @Input() cartCount = 0;

  /** Display name shown next to / under the avatar (used as fallback initials) */
  @Input() userName = 'Guest';

  /** Optional profile picture URL. Falls back to initials avatar when absent. */
  @Input() userAvatarUrl?: string;

  /** Store name / logo text shown on the far left */
  @Input() storeName = 'Marketa';

  /** Emits the current search text whenever the user submits the search */
  @Output() Search = new EventEmitter<string>();

  /** Emits when the cart icon is clicked */
  @Output() cartClick = new EventEmitter<void>();


  categoryItems: MenuItem[] = [];
  categoriesLoading = true;
  categoriesError = false;

  profileItems: MenuItem[] = [
    { label: 'My Profile', icon: 'pi pi-user', routerLink: '/profile' },
    { label: 'My Orders', icon: 'pi pi-shopping-bag', routerLink: '/order-layout' },
    { label: 'Wishlist', icon: 'pi pi-heart', routerLink: '/wishlist' },
    { separator: true },
    { label: 'Sign out', icon: 'pi pi-sign-out', command: () => this.TokenService.logout()},
  ];

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoriesLoading = true;
    this.categoriesError = false;

    this.categoryService.getCategoriesNames().subscribe({
      next: (categories: categoriesInterface[]) => {
        this.categoryItems = [
          ...categories.map((c) => ({
            label: c.name.trim(),
            icon: 'pi pi-tag',
            routerLink: `/category-layout/${c.id}`,
          })),
          { separator: true },
          { label: 'View all categories', icon: 'pi pi-th-large', routerLink: '/all-category' },
        ];
        this.categoriesLoading = false;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.categoriesError = true;
        this.categoriesLoading = false;
      },
    });
  }

  get initials(): string {
    return this.userName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }

  onSearchSubmit(): void {
    if(!this.searchTerm){
      return;
    }
    this.router.navigate(['/search-layout',this.searchTerm]);
  }

  searchTerm: string = '';
  suggestions: Suggestioninterface[] = [];

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.trim().toLowerCase();
    if (!query) {
      this.suggestions = [];
      return;
    }

    this.SearchService.getSuggestionResult(query)
      .pipe(
        catchError((err):Observable<Suggestioninterface[]> => {
          console.error(err);
          return of([]);
        })
      )
      .subscribe(res => {
        this.suggestions = res;
        this.cdr.detectChanges();
      });
  }

  selectedProduct: any = null;
  onSuggestionSelect(value: any) {
    // navigate to product, or whatever behavior you want on select
     this.selectedProduct = value;
  this.searchTerm = value?.name ?? '';
  }



  onCartClick(): void {
    if(this.TokenService.isLoggedin()){
    this.cartClick.emit();
    this.router.navigate(['cart-layout'])
    }
    else{
    this.messageService.add({
      severity:'info',
      summary:'Unauthorized',
      detail:'Please Login First',
      key: 'tl',
      life: 1000
    })
    }
  }



}

function of(arg0: never[]): any {
  throw new Error('Function not implemented.');
}
