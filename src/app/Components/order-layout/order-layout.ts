import { GetOrderInterface, OrderStatus, PaymentStatus } from './../../Interfaces/get-order-interface';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { OrderService } from '../../Services/order-service';


@Component({
  selector: 'app-order-layout',
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    DividerModule,
    AccordionModule,
    ButtonModule,
    SkeletonModule,],
  templateUrl: './order-layout.html',
  styleUrl: './order-layout.css',
})
export class OrderLayout implements OnInit {
  private OrderService = inject(OrderService);
  orders = signal<GetOrderInterface[]>([]);
  loading = signal<boolean>(true);
  currencyCode = input<string>('PKR');

  ngOnInit(): void {
    this.OrderService.GetOrders().subscribe({
      next: (data) => {
        this.orders.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
  // Derived: newest orders first
  sortedOrders = computed(() =>
    [...this.orders()].sort(
      (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    )
  );
  hasOrders = computed(() => this.sortedOrders().length > 0);

  // Skeleton placeholders while loading
  skeletonRows = Array.from({ length: 3 });

  private readonly statusMeta: Record<
    OrderStatus,
    { label: string; severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' }
  > = {
      [OrderStatus.Pending]: { label: 'Pending', severity: 'warn' },
      [OrderStatus.Processing]: { label: 'Processing', severity: 'info' },
      [OrderStatus.Shipped]: { label: 'Shipped', severity: 'info' },
      [OrderStatus.Delivered]: { label: 'Delivered', severity: 'success' },
      [OrderStatus.Cancelled]: { label: 'Cancelled', severity: 'danger' },
    };
  private readonly paymentMeta: Record<PaymentStatus,
    { label: string; severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' }> =
    {
      [PaymentStatus.Pending]: { label: 'Payment Pending', severity: 'warn' },
      [PaymentStatus.Paid]: { label: 'Paid', severity: 'success' },
      [PaymentStatus.Failed]: { label: 'Payment Failed', severity: 'danger' },
      [PaymentStatus.Refunded]: { label: 'Refunded', severity: 'secondary' },
    };

  statusLabel(status: OrderStatus): string {
    return this.statusMeta[status]?.label ?? 'Unknown';
  }
  statusSeverity(status: OrderStatus) {
    return this.statusMeta[status]?.severity ?? 'secondary';
  }

  paymentLabel(status: PaymentStatus): string {
    return this.paymentMeta[status]?.label ?? 'Unknown';
  }

  paymentSeverity(status: PaymentStatus) {
    return this.paymentMeta[status]?.severity ?? 'secondary';
  }

  itemCount(order: GetOrderInterface): number {
    return order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  trackByProductId(_index: number, item: { productId: number }): number {
    return item.productId;
  }
  trackByOrder(_index: number, order: GetOrderInterface): string {
    // orderDate + first item's orderId is a decent unique-ish key from this payload
    return `${order.orderDate}-${order.orderItems[0]?.orderId ?? _index}`;
  }
}
