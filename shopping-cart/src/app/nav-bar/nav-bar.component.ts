import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ClothingDataService } from '../clothing-data.service';
import { ClothItem } from '../models/clothItem.model';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  searchFormControl: FormControl = new FormControl();
  clothDataList: ClothItem[] = [];
  hidden = false;
  showSearch = false;
  displaySearch = false;
  constructor(private clothingDataService: ClothingDataService, private router: Router) { }
  ngOnInit(): void {
    this.clothingDataService.getProducts().subscribe(data => {
      this.clothDataList = data;
    });
    this.displaySearch = (window.innerWidth <= 477) ? true:false;

  }
  onResize(event: any) {
    this.displaySearch = (window.innerWidth <= 477) ? true:false;
    
  }
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  openSidenav() {
    this.sidenav.open();
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  clickHeader() {
    this.router.navigate(['']);
  }
  onSearch() {
    this.showSearch = false;
    if(this.searchFormControl.value){
      const value = this.searchFormControl.value.toLowerCase();
    const filters: { colors: string[], sex: string[], brands: string[], categories: string[] } = { colors: [], sex: [], brands: [], categories: [] };
    let availableGenderOptions: string[] = [];
    let availableColorOptions: string[] = [];
    let availableBrandOptions: string[] = [];
    let availableCategoryOptions: string[] = [];
    for (let item of this.clothDataList) {
      if (!availableColorOptions.includes(item.color.toLowerCase())) {
        availableColorOptions.push(item.color.toLowerCase());
      }
      if (!availableGenderOptions.includes(item.gender.toLowerCase())) {
        availableGenderOptions.push(item.gender.toLowerCase());
      }
      if (!availableBrandOptions.includes(item.brand.toLowerCase())) {
        availableBrandOptions.push(item.brand.toLowerCase());
      }
      if (!availableCategoryOptions.includes(item.category.toLowerCase())) {
        availableCategoryOptions.push(item.category.toLowerCase());
      }
    }
    for (let item of availableGenderOptions) {
      const regex = new RegExp(`\\b${item}\\b`, 'i');
      if (regex.test(value)) {
        filters.sex.push(item);
      }
    }
    for (let item of availableColorOptions) {
      if (value.includes(item)) {
        filters.colors.push(item);
      }
    }
    for (let item of availableBrandOptions) {
      if (value.includes(item)) {
        filters.brands.push(item);
      }
    }
    for (let item of availableCategoryOptions) {
      if (value.includes(item)) {
        filters.categories.push(item);
      }
    }
    let parameters = '';
    if (filters.sex.length > 0) {
      parameters += 'gender='
    }
    for (let item of filters.sex) {
      parameters += item;
      parameters += ',';
    }
    if (parameters.charAt(parameters.length - 1) == ',') {
      parameters = parameters.slice(0, -1);
    }
    if (filters.colors.length > 0) {
      if (parameters == '') {
        parameters += 'color=';
      } else {
        parameters += '+color=';
      }
    }
    for (let item of filters.colors) {
      parameters += item;
      parameters += ',';
    }
    if (parameters.charAt(parameters.length - 1) == ',') {
      parameters = parameters.slice(0, -1);
    }
    if (filters.brands.length > 0) {
      if (parameters == '') {
        parameters += 'brand=';
      } else {
        parameters += '+brand=';
      }
    }
    for (let item of filters.brands) {
      parameters += item;
      parameters += ',';
    }
    if (parameters.charAt(parameters.length - 1) == ',') {
      parameters = parameters.slice(0, -1);
    }
    if (filters.categories.length > 0) {
      if (parameters == '') {
        parameters += 'category=';
      } else {
        parameters += '+category=';
      }
    }
    for (let item of filters.categories) {
      parameters += item;
      parameters += ',';
    }
    if (parameters.charAt(parameters.length - 1) == ',') {
      parameters = parameters.slice(0, -1);
    }
    this.router.navigate(['/clothes/search', parameters]);

    }
    this.searchFormControl.setValue(null);
  }
  onSearchEnter(event: Event): void {
    event.preventDefault();
    this.onSearch();
  }
  signIn() {
    localStorage.setItem('accountIcon', 'true');
    this.router.navigate(['/signin'])
  }
  showMenuSearch(){
    this.showSearch = true;
  }
}
