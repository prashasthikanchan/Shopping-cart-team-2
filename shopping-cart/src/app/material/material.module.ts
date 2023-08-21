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

const MaterialComponents = [MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSidenavModule, MatInputModule,MatGridListModule,MatCardModule,MatTableModule];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
