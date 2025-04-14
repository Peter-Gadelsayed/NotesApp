import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    NavBarComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule

  ],
  exports: [
    NavBarComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
