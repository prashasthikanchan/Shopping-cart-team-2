import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ClothingDataService } from '../clothing-data.service';
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter-items',
  templateUrl: './filter-items.component.html',
  styleUrls: ['./filter-items.component.css']
})
export class FilterItemsComponent implements OnInit {
  isFilterVisible: boolean = false;
  clothDataList: any[] = [];
  colors: string[] = [];
  brands: string[] = [];
  price: number[] = [];

 checkedboxList: checkedBoxList={};

  constructor(private clothingDataService: ClothingDataService) { }
  @Output() checkboxlistUpdated = new EventEmitter();

  checkboxStates: Map<string, boolean> = new Map<string, boolean>();

  ngOnInit(): void {
    this.clothingDataService.getProducts().subscribe(data => {
      this.clothDataList = data;

      this.colors = this.getUniqueColors();
      this.brands = this.getUniqueBrands();
      this.price = this.getUniquePrice();

      this.initializeFilterGroups();
    });
  }

  getUniqueColors(): string[] {
    const uniqueColors = this.clothDataList
      .filter(cloth => cloth.color && typeof cloth.color === 'string')
      .map(cloth => cloth.color)
      .filter((color, index, self) => self.indexOf(color) === index);
    return uniqueColors;
  }

  getUniqueBrands(): string[] {
    const uniqueBrands = this.clothDataList
      .filter(cloth => cloth.brand && typeof cloth.brand === 'string')
      .map(cloth => cloth.brand)
      .filter((brand, index, self) => self.indexOf(brand) === index);
    return uniqueBrands;
  }
  getUniquePrice(): number[] {
    const uniquePrice = this.clothDataList
      .filter(cloth => cloth.price && typeof cloth.price === 'number')
      .map(cloth => cloth.price)
      .filter((price, index, self) => self.indexOf(price) === index);
    return uniquePrice;
  }

  initializeFilterGroups() {
    this.filterGroups[0].checkboxes = this.colors.map(color => ({ label: color }));
    this.filterGroups[1].checkboxes = this.brands.map(brand => ({ label: brand }));

    const minPrice = Math.floor(Math.min(...this.price) / 100) * 100;
    const maxPrice = Math.ceil(Math.max(...this.price) / 100) * 100;
    this.filterGroups[2].range = { min: minPrice, max: maxPrice };
  }

  filterGroups: FilterGroup[] = [
    {
      title: 'Color',
      checkboxes: [],
    },
    {
      title: 'Brand',
      checkboxes: [],
    },
    {
      title: 'Price',
      range: { min: 0, max: 100 },
    },
    {
      title:'Gender',
      checkboxes: [{label: 'Men'},
      {label: 'Women'}]
    },
    {
      title:'Rating',
      checkboxes:[{ label: '5'},
        { label: '4' },
        { label: '3'},
        { label: '2'},
        { label: '1'}]
    }

  ];

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  toggleCollapse(filterGroup: FilterGroup) {
    filterGroup.collapsed = !filterGroup.collapsed;
  }

  formatLabel(event: MatSliderChange) {
    
  }
 
  toggleCheckbox($event:any,filterGroupTitle: string, checkboxLabel: string) {
    console.log($event)
    const currentCheckedState = this.checkboxStates.get(checkboxLabel);
    //checkedboxList: checkedBoxList={};
    this.checkboxStates.set(checkboxLabel, !currentCheckedState);
    filterGroupTitle=filterGroupTitle.toLowerCase();
    if (this.checkboxStates.get(checkboxLabel)) {
      if (!this.checkedboxList[filterGroupTitle]) {
        this.checkedboxList[filterGroupTitle] = [];
      }
      this.checkedboxList[filterGroupTitle].push(checkboxLabel);
    } else {
      if (this.checkedboxList[filterGroupTitle]) {
        const index = this.checkedboxList[filterGroupTitle].indexOf(checkboxLabel);
        if (index !== -1) {
          this.checkedboxList[filterGroupTitle].splice(index, 1);
        }
      }
    }
    this.checkboxlistUpdated.emit(this.checkedboxList);
    console.log('checkboxList',this.checkedboxList);
  }
}

interface FilterGroup {
  title: string;
  items?: string[];
  checkboxes?: { label: string }[];
  range?: { min: number; max: number };
  collapsed?: boolean;
}

interface checkedBoxList {
  [key: string]: string[];
}
