import { Component, OnInit } from '@angular/core';
import { ClothingDataService } from '../clothing-data.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  clothDataList: any[]=[];

  constructor(private clothingDataService: ClothingDataService) { }

  ngOnInit(): void {
    this.clothingDataService.getProducts().subscribe(data => {
      this.clothDataList = data;
    });
  }

}
