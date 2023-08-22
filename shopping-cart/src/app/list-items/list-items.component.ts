import { Component, OnInit } from '@angular/core';
import { ClothingDataService } from '../clothing-data.service';
import { Router } from '@angular/router';
import { ClothItem } from '../models/clothItem.model';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  starsArray: number[] = Array(5).fill(0);
  clothDataList: any[]=[];
  sizeOptions: string[] = ['XS','S','M','L','XL','XXL'];
  selectedSize: string|null = null;
  quantityOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedQuantity: number = this.quantityOptions[0];
  selectedProduct: ClothItem | null = null;
  constructor(private clothingDataService: ClothingDataService , private router : Router)  { }

  ngOnInit(): void {
    this.clothingDataService.getProducts().subscribe(data => {
      this.clothDataList = data;
    });
  }
  showItem(id : number,sidenav : MatSidenav) : void {
    this.selectedSize = null;
    this.selectedProduct = this.clothDataList.find(item => item.id === id);
    console.log(this.selectedProduct)
    sidenav.open();
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }
  selectQuantity(event : any) {
    this.selectedQuantity = event.value;
    console.log(this.selectedQuantity)
  }
}
