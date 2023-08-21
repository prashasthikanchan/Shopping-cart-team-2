import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './nav-bar/menu/menu.component';
import { CartComponent } from './nav-bar/cart/cart.component';
import { SearchBarComponent } from './nav-bar/search-bar/search-bar.component';
import { AccountComponent } from './nav-bar/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MenuComponent,
    CartComponent,
    SearchBarComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
