import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LogInComponent } from './core/authantications/log-in/log-in.component';
import { SignUpComponent } from './core/authantications/sign-up/sign-up.component';
import { LandingComponent } from './core/landing/landing.component';
import { authGuard } from './core/authantications/auth.guard';
import { loginPreventGuard } from './core/authantications/login-prevent.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LogInComponent, canActivate: [loginPreventGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [loginPreventGuard] },
  {
    path: 'notes', loadChildren: () =>
      import('./features/notes/notes.module').then((m) => m.NotesModule), canActivate: [authGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
