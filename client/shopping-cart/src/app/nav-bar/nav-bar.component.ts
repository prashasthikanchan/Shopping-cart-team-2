import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ClothingDataService } from '../service/clothing-data.service';
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
    this.displaySearch = (window.innerWidth <= 477) ? true : false;

  }
  onResize(event: any) {
    this.displaySearch = (window.innerWidth <= 477) ? true : false;

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
    if (this.searchFormControl.value) {
      const value = this.searchFormControl.value.toLowerCase();
      this.router.navigate(['/clothes/search'], {
        queryParams: { q: value }});
    }
    this.searchFormControl.setValue(null);
  }

  onSearchEnter(event: Event): void {
    event.preventDefault();
    this.onSearch();
  }
  signIn() {
    this.router.navigate(['/signin'])
  }
  showMenuSearch() {
    this.showSearch = true;
  }
}
