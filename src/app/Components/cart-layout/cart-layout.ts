import { OrderService } from './../../Services/order-service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressBarModule } from 'primeng/progressbar';
import {
  BillingDetails,
  CartItem,
  ShippingLocation,
  ShippingMethod,
  CartProductDto,
} from '../../Interfaces/cart-interface';
import { CartService } from '../../Services/cart-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-layout',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    InputNumberModule,
    InputTextModule,
    SelectModule,
    RadioButtonModule,
    ProgressBarModule,
  ],
  templateUrl: './cart-layout.html',
  styleUrl: './cart-layout.css',
})
export class CartLayout implements OnInit {
  private cartservice = inject(CartService);
  private OrderService = inject(OrderService)
  private router = inject(Router)
  // Set this to wherever your product images are actually served from.
  private apiBaseUrl = 'https://uecommercestore.runasp.net/';

  cartItems = signal<CartItem []>([]);
  cartId: string | null = null;
  loading = signal(true)
  ngOnInit(): void {
    // Read fresh on init rather than at property-initialization time.
    this.cartId = localStorage.getItem('CartId');

    if (!this.cartId) {
      console.warn('No CartId found in localStorage.');
      return;
    }

    this.cartservice.getCartItems(Number(this.cartId)).subscribe({
      next: (res: any[]) => {
        // API doesn't return a quantity per line item, so default to 1
        // and keep any existing quantity if one is ever present.
        const normalized = res.map((item) => ({
          ...item,
          quantity: item.quantity ?? 1,
        }));
        this.cartItems.set(normalized);
        this.loading.set(false)
      },
      error: (err) => {
        console.error('Failed to load cart items', err);
        this.loading.set(false)
      },
    });
  }

  // ---------------------------------------------------------------------
  // Images
  // ---------------------------------------------------------------------
  getMainImage(item: CartItem): string {
    const images = item.cartProductDto?.images ?? [];
    const main = images.find((img: any) => img.isMain) ?? images[0];
    return main ? `${this.apiBaseUrl}${main.url}` : 'assets/placeholder.png';
  }

  // ---------------------------------------------------------------------
  // Shipping methods + countries (swap for real lookups as needed)
  // ---------------------------------------------------------------------
  shippingMethods: ShippingMethod[] = [
    { label: 'Standard — 5 to 7 days', value: 'Standard', price: 5 },
    { label: 'Express — 2 to 3 days', value: 'Express', price: 15 },
    { label: 'Next day', value: 'NextDay', price: 30 },
  ];

  selectedShipping = signal<ShippingMethod>(this.shippingMethods[0]);

  countries = [
    { label: 'Pakistan', value: 'PK' },
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'United Arab Emirates', value: 'AE' },
  ];

  // ---------------------------------------------------------------------
  // Forms
  // ---------------------------------------------------------------------
 // billingForm: FormGroup;
  shippingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // this.billingForm = this.fb.group({
    //   fullName: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   phone: ['', Validators.required],
    // });

    this.shippingForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['PK', Validators.required],
    });
  }

  // ---------------------------------------------------------------------
  // Derived totals
  // ---------------------------------------------------------------------
  itemCount = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.cartItems().reduce(
      (sum, item) => sum + item.cartProductDto.price * item.quantity,
      0
    )
  );

  shippingCost = computed(() => this.selectedShipping().price);

  total = computed(() => this.subtotal() + this.shippingCost());

  // ---------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------
  updateQuantity(item: CartItem, quantity: number | null): void {
    if (quantity == null || quantity < 1) return;
    this.cartItems.update((items) =>
      items.map((i) => (i.id === item.id ? { ...i, quantity } : i))
    );
  }

  removeItem(item: CartItem): void {
    this.cartItems.update((items) => items.filter((i) => i.id !== item.id));
    this.cartservice.DeleteItemFromCart(item.cartId,item.productId).subscribe(res=>{
      console.log(res);

    })
  }

  selectShipping(methodValue: string): void {
    const method = this.shippingMethods.find((m) => m.value === methodValue);
    if (method) this.selectedShipping.set(method);
  }

  placeOrder(): void {
    // this.billingForm.markAllAsTouched();
    this.shippingForm.markAllAsTouched();

    if (
      // this.billingForm.invalid ||
      this.shippingForm.invalid ||
      this.cartItems().length === 0
    ) {
      return;
    }

    const order = {
      items:  this.cartItems().map(item => ({
      productId: item.productId,
      quantity: item.quantity
    })),
      paymentMethod: 'jolopaisa',
     shippingMethod: this.selectedShipping().value,
     shippingAddressDetails: this.shippingForm.value as ShippingLocation,
    };
   this.OrderService.CreateOrder(order).subscribe(res=>{
    console.log(res);
   })
   this.router.navigate(['order-layout'])
    // Replace with your actual checkout/order API call
    console.log('Placing order', order);

  }
}
