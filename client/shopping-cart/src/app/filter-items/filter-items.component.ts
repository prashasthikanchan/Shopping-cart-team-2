import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ClothingDataService } from '../service/clothing-data.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { FilterSearchUpdateService } from '../filter-search-update.service';
import { Router } from '@angular/router';


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
  aggregations: any;
  selectedFilters: Map<string, string[]> = new Map();

  constructor(private router: Router, private clothingDataService: ClothingDataService, private media: MediaMatcher, private filterSearchUpdateService: FilterSearchUpdateService) {
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
    });
    this.mobileQuery = this.media.matchMedia('(max-width: 576px)');
    this.panelOpenState = !this.mobileQuery.matches;

    this.filterSearchUpdateService.filterData$.subscribe(data => {
      if (data) {
        this.searchParameters = data.searchParameters;
        this.searchResults = data.searchResults;
      }
    });
    this.clothingDataService.aggregations$.subscribe(data => {
      if (!this.isEqual(this.aggregations, data)) {
        this.selectedFilters = new Map();
      }
      this.aggregations = data;
      this.initializeFilterGroups(data);
    });

  }

  filterGroups: FilterGroup[] = [];
  isEqual(objA: any, objB: any): boolean {

    return JSON.stringify(objA) === JSON.stringify(objB);
  }
  initializeFilterGroups(data: any) {
    this.filterGroups = [];
    if (data) {
      this.filterGroups.push({
        title: 'Color',
        checkboxes: data.colors.map((color: string) => {
          const parts = color.split(', ');
          const label = parts[0].split(': ')[1];
          const count = parseInt(parts[1].split(': ')[1], 10);
          return { label, count };
        })
      });
      this.filterGroups.push({
        title: 'Brand',
        checkboxes: data.brands.map((brand: string) => {
          const parts = brand.split(', ');
          const label = parts[0].split(': ')[1];
          const count = parseInt(parts[1].split(': ')[1], 10);
          return { label, count };
        })
      });
      this.filterGroups.push({
        title: 'Category',
        checkboxes: data.categories.map((category: string) => {
          const parts = category.split(', ');
          const label = parts[0].split(': ')[1];
          const count = parseInt(parts[1].split(': ')[1], 10);
          return { label, count };
        })
      });
      this.filterGroups.push({
        title: 'Gender',
        checkboxes: data.genders.map((gender: string) => {
          const parts = gender.split(', ');
          const label = parts[0].split(': ')[1];
          const count = parseInt(parts[1].split(': ')[1], 10);
          return { label, count };
        })
      });
      this.filterGroups.push({
        title: 'Price',
        checkboxes: data.prices.map((price: string) => {
          const parts = price.split(', ');
          const label = parts[0].split(': ')[1];
          const count = parseInt(parts[1].split(': ')[1], 10);
          return { label, count };
        })
      });
      this.filterGroups.push({
        title: 'Rating',
        checkboxes: data.ratings.map((rating: string) => {
          const parts = rating.split(', ');
          const label = parts[0].split(': ')[1];
          const count = parseInt(parts[1].split(': ')[1], 10);
          return { label, count };
        }).reverse()
      });
    }
  }


  filterOptions: Map<string, string[]> = new Map();

  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }

    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  formatPriceLabel(label: string): string {
    const parts = label.split('-');
    const lowerBound = parseFloat(parts[0]);
    const upperBound = parseFloat(parts[1]);
  
    if (lowerBound === 0 && upperBound === 1000) {
      return 'Under 1000';
    } else if (lowerBound === 5000 && upperBound === 10000) {
      return 'Over 50001';
    } else {
      return `${Math.round(lowerBound)}-${Math.round(upperBound)}`;
    }
  }

  toggleCheckbox(fieldName: string, label: string): void {
    const values = this.selectedFilters.get(fieldName) ?? [];
    if (values.includes(label)) {
      const updatedValues = values.filter(value => value !== label);
      if (updatedValues.length === 0) {
        this.selectedFilters.delete(fieldName);
      } else {
        this.selectedFilters.set(fieldName, updatedValues);
      }
    } else {
      values.push(label);
      this.selectedFilters.set(fieldName, values);
    }
    let params = '';
    this.selectedFilters.forEach((values, fieldName) => {
      values.forEach((label) => {
        if (params !== '') {
          params += '&';
        }
        params += `${fieldName}=${encodeURIComponent(label)}`;
      });
    });
    this.router.navigate(['/clothes/search'], { queryParams: { f: params }, queryParamsHandling: 'merge' });
  }

  displayedColumns: string[] = ['name', 'age', 'gender'];
  dataSource = new MatTableDataSource<string>(['Men', 'Women']);
  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }
  toggleCollapse(filterGroup: FilterGroup) {
    filterGroup.collapsed = !filterGroup.collapsed;
  }

  shouldCheckboxBeChecked(checkboxLabel: string, filterGroupTitle: string): boolean {
    const selectedLabels = this.selectedFilters.get(filterGroupTitle);
    return selectedLabels?.includes(checkboxLabel) ?? false;
  }


}
interface FilterGroup {
  title: string;
  items?: string[];
  checkboxes?: { label: string, count: number }[];
  range?: { min: number; max: number };
  collapsed?: boolean;
}
interface checkedBoxList {
  [key: string]: string[];
}
