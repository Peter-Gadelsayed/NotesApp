import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { LogInComponent } from './authantications/log-in/log-in.component';
import { SignUpComponent } from './authantications/sign-up/sign-up.component';
import { LandingComponent } from './landing/landing.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreRoutingModule
  ],
  exports: [

  ]
})
export class CoreModule { }
