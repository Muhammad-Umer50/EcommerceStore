import { Routes } from '@angular/router';
import { CategoryLayout } from './Components/category-layout/category-layout';
import { ProductsLayout } from './Components/products-layout/products-layout';
import { AllCategory } from './Components/all-category/all-category';
import { SearchLayout } from './Components/search-layout/search-layout';
import { ProductDetails } from './Components/product-details/product-details';
import { Signup } from './Components/signup/signup';
import { Signin } from './Components/signin/signin';
import { CartLayout } from './Components/cart-layout/cart-layout';
import { cartgardGuard } from './Gards/cartgard-guard';
import { OrderLayout } from './Components/order-layout/order-layout';

export const routes: Routes = [
  {path:'',component:ProductsLayout},
  {path:'all-category' , component:AllCategory},
  {path:'category-layout/:id',component:CategoryLayout},
  {path:'search-layout/:srh',component:SearchLayout},
  {path:'product-details/:id',component:ProductDetails},
  {path:'signup',component:Signup},
  {path:'signin',component:Signin},
  {path:'cart-layout',component:CartLayout,canActivate:[cartgardGuard]},
  {path:'order-layout',component:OrderLayout,canActivate:[cartgardGuard]}
];
