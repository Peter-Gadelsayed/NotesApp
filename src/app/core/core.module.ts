import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { LogInComponent } from './authantications/log-in/log-in.component';
import { SignUpComponent } from './authantications/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    HomeComponent,
  ]
})
export class CoreModule { }
