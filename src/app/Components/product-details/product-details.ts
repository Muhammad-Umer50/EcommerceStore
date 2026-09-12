import { Component, HostListener, inject, model, OnInit, signal } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { ProductDetailsService } from '../../Services/product-details-service';
import { ProductImage } from '../../Interfaces/product-interface';
import { ProductdetailsInterface } from '../../Interfaces/productdetails-interface';
import { FormsModule } from '@angular/forms'; // needed for [ngModel] on p-rating
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs';
import { CartService } from '../../Services/cart-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TokenService } from '../../AuthServices/token-service';
@Component({
  selector: 'app-product-details',
  imports: [ CommonModule,
    FormsModule,
    GalleriaModule,
    RatingModule,
    ButtonModule,
  ToastModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
   providers: [MessageService]
})
export class ProductDetails implements OnInit {
 private messageService = inject(MessageService);
 mainurl = 'https://uecommercestore.runasp.net/'
 tokenservice = inject(TokenService);
 showSuccess() {
  if(this.tokenservice.isLoggedin()){
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product Added to Cart',
    });
  }else{
    this.messageService.add({
      severity:'info',
      summary:'Unauthorized',
      detail:'Please Login First',
      life: 1500
    })
  }

  }
  productDetailsService = inject(ProductDetailsService);
  cartService = inject(CartService)
  router = inject(ActivatedRoute)
  productDetails: ProductdetailsInterface | undefined;
  images = signal<ProductImage[]>([]);
  ngOnInit(): void {

    // this.productDetailsService.getDetails(1).subscribe(res => {
    //   console.log(res);
      // this.productDetails = res
      // this.images.set(res.images.filter(i => i.url));
    // })

    this.router.paramMap.pipe(
      switchMap(params=>{
        const id = params.get('id');
        return this.productDetailsService.getDetails(id)
      })
    ).subscribe(res=>{
     this.productDetails = res
      this.images.set(res.images.filter(i => i.url));
    })
  }
addToCart(product: ProductdetailsInterface) {
  this.cartService.AddToCart(product.id).subscribe({
    next:(res)=>{
      console.log(res);
    },
    error(err) {
      console.log(err);

    },
  })
}

}
