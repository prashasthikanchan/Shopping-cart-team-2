import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './nav-bar/menu/menu.component';
import { CartComponent } from './nav-bar/cart/cart.component';
import { SearchBarComponent } from './nav-bar/search-bar/search-bar.component';
import { AccountComponent } from './nav-bar/account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListItemsComponent } from './list-items/list-items.component';
import { FilterItemsComponent } from './filter-items/filter-items.component';
import { IndexPageComponent } from './index-page/index-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MenuComponent,
    CartComponent,
    SearchBarComponent,
    AccountComponent,
    ListItemsComponent,
    FilterItemsComponent,
    IndexPageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
