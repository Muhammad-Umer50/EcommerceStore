import { Routes } from '@angular/router';

import { cartgardGuard } from './Gards/cartgard-guard';

// export const routes: Routes = [
//   {path:'',component:ProductsLayout},
//   {path:'all-category' , component:AllCategory},
//   {path:'category-layout/:id',component:CategoryLayout},
//   {path:'search-layout/:srh',component:SearchLayout},
//   {path:'product-details/:id',component:ProductDetails},
//   {path:'signup',component:Signup},
//   {path:'signin',component:Signin},
//   {path:'cart-layout',component:CartLayout,canActivate:[cartgardGuard]},
//   {path:'order-layout',component:OrderLayout,canActivate:[cartgardGuard]}
// ];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Components/products-layout/products-layout')
        .then(m => m.ProductsLayout)
  },

  {
    path: 'all-category',
    loadComponent: () =>
      import('./Components/all-category/all-category')
        .then(m => m.AllCategory)
  },

  {
    path: 'category-layout/:id',
    loadComponent: () =>
      import('./Components/category-layout/category-layout')
        .then(m => m.CategoryLayout)
  },

  {
    path: 'search-layout/:srh',
    loadComponent: () =>
      import('./Components/search-layout/search-layout')
        .then(m => m.SearchLayout)
  },

  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./Components/product-details/product-details')
        .then(m => m.ProductDetails)
  },

  {
    path: 'signup',
    loadComponent: () =>
      import('./Components/signup/signup')
        .then(m => m.Signup)
  },

  {
    path: 'signin',
    loadComponent: () =>
      import('./Components/signin/signin')
        .then(m => m.Signin)
  },

  {
    path: 'cart-layout',
    loadComponent: () =>
      import('./Components/cart-layout/cart-layout')
        .then(m => m.CartLayout),
    canActivate: [cartgardGuard]
  },

  {
    path: 'order-layout',
    loadComponent: () =>
      import('./Components/order-layout/order-layout')
        .then(m => m.OrderLayout),
    canActivate: [cartgardGuard]
  }
];
