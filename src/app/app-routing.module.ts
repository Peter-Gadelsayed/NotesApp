import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LogInComponent } from './core/authantications/log-in/log-in.component';
import { SignUpComponent } from './core/authantications/sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'login', component: LogInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
