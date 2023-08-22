import { Component, OnInit } from '@angular/core';
import { ClothingDataService } from '../clothing-data.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  clothDataList: any[] = [];
  filteredClothDataList: any[] = [];

  constructor(private clothingDataService: ClothingDataService) { }

  ngOnInit(): void {
    this.clothingDataService.getProducts().subscribe(data => {
      this.clothDataList = data;
      this.filteredClothDataList = data;
    });
  }

  addFilter($event: any) {
   // this.filteredClothDataList = JSON.parse(JSON.stringify(this.clothDataList));
    //const parsestore = JSON.parse(JSON.stringify(this.clothDataList));
    console.log('ppppiii', this.filteredClothDataList);
    let checkedBoxFilter = $event;
    console.log($event);
    let genderMatches = true;
    let brandMatches = true;
    let colorMatches = true;
    let colorFilter = checkedBoxFilter['color'];
    let brandFilter = checkedBoxFilter['brand'];
    let genderFilter = checkedBoxFilter['gender'];
    let ratingFilterString = checkedBoxFilter['rating'];
    let ratingFilter = ratingFilterString ? ratingFilterString.map(Number) : [];
    this.filteredClothDataList = this.clothDataList.filter((cloth:any) => {
      colorMatches = colorFilter ? (colorFilter.length>0 ? colorFilter.includes(cloth.color) :true) : true;
      brandMatches = brandFilter ? (brandFilter.length>0 ? brandFilter.includes(cloth.brand):true) : true;
      genderMatches = genderFilter ? (genderFilter.length>0?genderFilter.includes(cloth.gender):true) : true;
      let ratingMatches = ratingFilter ? (ratingFilter.length>0?ratingFilter.includes(cloth.rating):true) : true;
      

      if (colorMatches && brandMatches && genderMatches && ratingMatches) {
        return true;
      }
      return false;
    });

    // console.log("filteredList:", filteredList);

    // this.filteredClothDataList = filteredList;   
    console.log("dasdasdad", this.filteredClothDataList);
    //return filteredList;
  }



}
