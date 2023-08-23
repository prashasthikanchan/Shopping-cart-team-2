import { Component, OnInit } from '@angular/core';
import { ClothingDataService } from '../clothing-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  indexPageItems : {brands : [{name : string , image : string}], 
  categories : [{name : string, image : string}],
  gender : [{name : string , image : string}]} = 
  {brands : [{name : '', image : ''}], categories : [{name : '',image:''}] , gender : [{name : '' , image : ''}]}
  brands : [{name : string , image : string}] = [{name : '',image : ''}];
  allCategories : [{name : string , image : string}] = [{name : '',image : ''}];
  genderOptions : [{name : string , image : string}] = [{name : '',image : ''}];
  constructor(private clothingDataService : ClothingDataService, private router : Router) {}
  ngOnInit(): void {
    this.clothingDataService.getIndexPageItems().subscribe(data => {
      this.indexPageItems = data;
      this.brands = this.indexPageItems.brands;
      console.log(this.indexPageItems)
      this.allCategories = this.indexPageItems.categories;
      this.genderOptions = this.indexPageItems.gender;
    });
  }
  onClickBrand(name : string){
    this.router.navigate(['/clothes/search',`brand=${name.toLowerCase()}`])
  }
  onClickCategory(name : string){
    this.router.navigate(['/clothes/search',`category=${name.toLowerCase()}`])
  }
  onClickGender(name : string){
    this.router.navigate(['/clothes/search',`gender=${name.toLowerCase()}`])
  }
}
