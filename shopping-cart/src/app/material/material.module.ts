import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule} from '@angular/material/grid-list'
import {MatCardModule} from '@angular/material/card'
import { MatTableModule } from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
const MaterialComponents = [MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSidenavModule, MatInputModule,MatGridListModule,MatCardModule,MatTableModule,MatMenuModule,MatButtonToggleModule,MatSelectModule];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
