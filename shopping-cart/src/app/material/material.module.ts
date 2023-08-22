import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule} from '@angular/material/grid-list'
import {MatCardModule} from '@angular/material/card'
import {MatListModule} from '@angular/material/list'
import {MatSliderModule} from '@angular/material/slider'
import {MatCheckboxModule} from '@angular/material/checkbox'

const MaterialComponents = [MatToolbarModule, MatButtonModule,MatListModule, MatIconModule,MatCheckboxModule,MatSliderModule, MatFormFieldModule, MatSidenavModule, MatInputModule,MatGridListModule,MatCardModule];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
