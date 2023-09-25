import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './nav-bar/cart/cart.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { SignInComponent } from './sign-in/sign-in.component';
const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'clothes', component: ListItemsComponent },
  { path: 'clothes/search', component: ListItemsComponent },
  { path: 'signin', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
