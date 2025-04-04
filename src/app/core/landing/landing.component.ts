import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/authantications/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
 constructor(private router:Router, private authService: AuthService) {}

 navigateToCreate() {
  if (this.authService.isLogged()) {
    this.router.navigate(['/create-note']);
  } else {
    this.router.navigate(['/login']);
  }
}
}

