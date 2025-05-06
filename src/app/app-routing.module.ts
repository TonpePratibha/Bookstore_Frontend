import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterloginComponent } from './Components/registerlogin/registerlogin.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BookdetailsComponent } from './Components/bookdetails/bookdetails.component';
import { authGuard } from './Components/auth.guard';
import { BooksdataComponent } from './Components/booksdata/booksdata.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrderComponent } from './Components/order/order.component';
import { withJsonpSupport } from '@angular/common/http';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'registerlogin', pathMatch: 'full' },
  {path:'registerlogin', component:RegisterloginComponent},
  {path:'forgot', component:ForgotPasswordComponent},
//  {path:'reset',component:ResetPasswordComponent},
 {path:'reset/:token',component:ResetPasswordComponent},
 
  {path:'dashboard',component:DashboardComponent, canActivate:[authGuard],
    children:[
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path:'home', component:BooksdataComponent},
     {path:'bookdetails/:id',component:BookdetailsComponent},
     {path:'cart', component:CartComponent},
     {path:'order',component:OrderComponent},
     {path:'wishlist',component:WishlistComponent}
    ]
    
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
