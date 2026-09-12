import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface FooterLink {
  label: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface PaymentMethod {
  label: string;
  icon: string;
}

interface CurrencyOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    SelectModule,
    ToastModule,
  ],
  providers: [MessageService],
 templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();

  readonly email = signal('');

  readonly currency = signal('PKR');

  readonly currencyOptions: CurrencyOption[] = [
    { label: 'PKR', value: 'PKR' },
    { label: 'USD', value: 'USD' },
    { label: 'AED', value: 'AED' },
  ];

  readonly columns: FooterColumn[] = [
    {
      title: 'Shop',
      links: [
        { label: 'Laptops', url: '/categories/laptops' },
        { label: 'Smartphones', url: '/categories/smartphones' },
        { label: 'Accessories', url: '/categories/accessories' },
        { label: 'Deals & offers', url: '/deals' },
      ],
    },
    {
      title: 'Customer care',
      links: [
        { label: 'Track your order', url: '/orders/track' },
        { label: 'Returns & refunds', url: '/support/returns' },
        { label: 'Shipping info', url: '/support/shipping' },
        { label: 'FAQs', url: '/support/faqs' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Marketa', url: '/about' },
        { label: 'Careers', url: '/careers' },
        { label: 'Sell on Marketa', url: '/sell' },
        { label: 'Contact us', url: '/contact' },
      ],
    },
  ];

  readonly socialLinks: FooterLink[] = [
    { label: 'Facebook', url: 'https://facebook.com' },
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'X', url: 'https://x.com' },
    { label: 'YouTube', url: 'https://youtube.com' },
  ];

  readonly paymentMethods: PaymentMethod[] = [
    { label: 'Visa', icon: 'pi pi-credit-card' },
    { label: 'Mastercard', icon: 'pi pi-credit-card' },
    { label: 'Cash on delivery', icon: 'pi pi-wallet' },
    { label: 'Easypaisa / JazzCash', icon: 'pi pi-mobile' },
  ];

  constructor(private messageService: MessageService) {}

  subscribe(): void {
    const value = this.email().trim();

    if (!value || !value.includes('@')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid email',
        detail: 'Enter a valid email address to subscribe.',
        life: 3000,
      });
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Subscribed',
      detail: `We'll send deals to ${value}.`,
      life: 3000,
    });
    this.email.set('');
  }
}
