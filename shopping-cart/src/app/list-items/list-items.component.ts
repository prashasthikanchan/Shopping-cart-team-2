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
  clothDataList: any[] = [];
  sizeOptions: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedSize: string | null = null;
  quantityOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedQuantity: number = this.quantityOptions[0];
  selectedProduct: ClothItem | null = null;
  constructor(private clothingDataService: ClothingDataService, private router: Router) { }
  filteredClothDataList: any[] = [];

  ngOnInit(): void {
    this.clothingDataService.getProducts().subscribe(data => {
      this.clothDataList = data;
      this.filteredClothDataList = data;
    });
  }

  showItem(id: number, sidenav: MatSidenav): void {
    this.selectedSize = null;
    this.selectedProduct = this.clothDataList.find(item => item.id === id);
    console.log(this.selectedProduct)
    sidenav.open();
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }
  selectQuantity(event: any) {
    this.selectedQuantity = event.value;
    console.log(this.selectedQuantity)
  }


  addFilter($event: any) {
    let checkedBoxFilter = $event;
    let colorFilter = checkedBoxFilter['color'];
    let brandFilter = checkedBoxFilter['brand'];
    let genderFilter = checkedBoxFilter['gender'];
    let ratingFilterString = checkedBoxFilter['rating'];
    let ratingFilter = ratingFilterString ? ratingFilterString.map(Number) : [];
    this.filteredClothDataList = this.clothDataList.filter((cloth: any) => {
      let colorMatches = colorFilter ? (colorFilter.length > 0 ? colorFilter.includes(cloth.color) : true) : true;
      let brandMatches = brandFilter ? (brandFilter.length > 0 ? brandFilter.includes(cloth.brand) : true) : true;
      let genderMatches = genderFilter ? (genderFilter.length > 0 ? genderFilter.includes(cloth.gender) : true) : true;
      let ratingMatches = ratingFilter ? (ratingFilter.length > 0 ? ratingFilter.includes(cloth.rating) : true) : true;

      if (colorMatches && brandMatches && genderMatches && ratingMatches) {
        return true;
      }
      return false;
    });

  }

}
