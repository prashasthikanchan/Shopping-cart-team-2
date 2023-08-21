import { Component,ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent{
  searchFormControl : FormControl = new FormControl();
  constructor() { }
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  openSidenav() {
    this.sidenav.open();
  }
}
