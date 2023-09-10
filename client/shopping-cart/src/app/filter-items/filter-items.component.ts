import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ClothingDataService } from '../service/clothing-data.service';
import { MatSliderChange } from '@angular/material/slider';
import { ClothItem } from '../models/clothItem.model';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MediaMatcher } from '@angular/cdk/layout';
import { FilterSearchUpdateService } from '../filter-search-update.service';

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
  checkedboxList: checkedBoxList = {};
  starsArray = Array(5).fill(0);
  filterGroupOpenStates: { [title: string]: boolean } = {};
  mobileQuery: MediaQueryList | undefined;
  panelOpenState: boolean = true;
  searchParameters: any;


  constructor(private clothingDataService: ClothingDataService, private media: MediaMatcher, private filterSearchUpdateService: FilterSearchUpdateService) {
    this.filterGroups.forEach(filterGroup => {
      this.filterGroupOpenStates[filterGroup.title] = true;
    });
  }
  @Output() checkboxlistUpdated = new EventEmitter();
  checkboxStates: Map<string, boolean> = new Map<string, boolean>();

  @Input() searchResults: any[] = [];

  ngOnInit(): void {
    this.clothingDataService.getProducts().subscribe(data => {
      this.clothDataList = data;
      this.colors = this.getUniqueColors();
      this.brands = this.getUniqueBrands();
      this.price = this.getUniquePrice();
      this.initializeFilterGroups();
    });
    this.mobileQuery = this.media.matchMedia('(max-width: 576px)');
    this.panelOpenState = !this.mobileQuery.matches;

    this.checkboxlistUpdated.subscribe((updatedCheckboxList: checkedBoxList) => {
      this.updateCheckboxesBasedOnSearchResults(updatedCheckboxList);
    });

    this.filterSearchUpdateService.filterData$.subscribe(data => {
      if (data) {
        this.searchParameters = data.searchParameters;
        this.searchResults = data.searchResults;
      }
    });
  }

  displayedColumns: string[] = ['name', 'age', 'gender'];
  dataSource = new MatTableDataSource<string>(['Men', 'Women']);
  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  updateCheckboxesBasedOnSearchResults(updatedCheckboxList: checkedBoxList) {
    this.checkboxStates.clear();
    this.checkedboxList = updatedCheckboxList;
    for (const filterGroupTitle in updatedCheckboxList) {
      if (updatedCheckboxList.hasOwnProperty(filterGroupTitle)) {
        const selectedLabels = updatedCheckboxList[filterGroupTitle];
        selectedLabels.forEach(label => {
          this.checkboxStates.set(label, true);
        });
      }
    }
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
    const priceSegment = (maxPrice - minPrice) / 5;
    this.filterGroups[2].checkboxes = [];
    for (let i = 0; i < 5; i++) {
      const label = `${minPrice + priceSegment * i}-${minPrice + priceSegment * (i + 1)}`;
      this.filterGroups[2].checkboxes.push({ label: label });
    }
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
      checkboxes: [],
    },
    {
      title: 'Gender',
      checkboxes: [{ label: 'Men' },
      { label: 'Women' }]
    },
    {
      title: 'Rating',
      checkboxes: [{ label: '5' },
      { label: '4' },
      { label: '3' },
      { label: '2' },
      { label: '1' }]
    }
  ];
  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }
  toggleCollapse(filterGroup: FilterGroup) {
    filterGroup.collapsed = !filterGroup.collapsed;
  }
  toggleCheckbox($event: any, filterGroupTitle: string, checkboxLabel: string) {
    const currentCheckedState = this.checkboxStates.get(checkboxLabel);
    this.checkboxStates.set(checkboxLabel, !currentCheckedState);
    filterGroupTitle = filterGroupTitle.toLowerCase();
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
  }

  shouldCheckboxBeChecked(checkboxLabel: string, filterGroupTitle: string): boolean {
    if (!this.searchParameters) {
      return false;
    }
    if (filterGroupTitle === 'Gender' && this.searchParameters.hasOwnProperty('gender')) {
      return this.searchParameters.gender.includes(checkboxLabel.toLowerCase());
    }
    if (filterGroupTitle === 'Brand' && this.searchParameters.hasOwnProperty('brand')) {
      return this.searchParameters.brand.includes(checkboxLabel.toLowerCase());
    }
    if (filterGroupTitle === 'Color' && this.searchParameters.hasOwnProperty('color')) {
      return this.searchParameters.color.includes(checkboxLabel.toLowerCase());
    }
    return false;
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