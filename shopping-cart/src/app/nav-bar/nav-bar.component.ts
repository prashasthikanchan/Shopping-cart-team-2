import { Component, OnInit,ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  searchFormControl : FormControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
  }

  openSidenav() {
  }
}
