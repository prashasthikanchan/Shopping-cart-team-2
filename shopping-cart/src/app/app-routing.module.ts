import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './nav-bar/menu/menu.component';
import { CartComponent } from './nav-bar/cart/cart.component';
import { AccountComponent } from './nav-bar/account/account.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { ListItemsComponent } from './list-items/list-items.component';
const routes: Routes = [
  {path : '' , component : IndexPageComponent},
  {path : 'menu' , component : MenuComponent },
  {path : 'cart' , component : CartComponent},
  {path : 'account' , component : AccountComponent},
  {path : 'clothes',component : ListItemsComponent},
  {path : 'search/:parameters' , component : ListItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
