import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './nav-bar/menu/menu.component';
import { CartComponent } from './nav-bar/cart/cart.component';
import { AccountComponent } from './nav-bar/account/account.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  // {path : '/' , component : AppComponent}
  {path : 'menu' , component : MenuComponent },
  {path : 'cart' , component : CartComponent},
  {path : 'account' , component : AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
