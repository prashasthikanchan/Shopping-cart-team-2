import { Component, OnInit } from '@angular/core';
import { ClothingDataService } from '../clothing-data.service';
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  indexPageItems : {brands : [{name : string , image : string}]}= {brands : [{name : '', image : ''}]}
  brands : [{name : string , image : string}] = [{name : '',image : ''}];
  constructor(private clothingDataService : ClothingDataService) {}
  ngOnInit(): void {
    this.clothingDataService.getIndexPageItems().subscribe(data => {
      this.indexPageItems = data;
      this.brands = this.indexPageItems.brands;
      console.log(this.brands[0])
    });
  }

























































































}
