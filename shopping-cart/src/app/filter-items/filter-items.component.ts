import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-filter-items',
  templateUrl: './filter-items.component.html',
  styleUrls: ['./filter-items.component.css']
})
export class FilterItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['name', 'age', 'gender'];
  dataSource = new MatTableDataSource<string>(['Men','Women']);

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
