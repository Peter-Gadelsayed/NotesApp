import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isMenuOpen = false;

  constructor(private router:Router, private authService: AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signupClicked() {
    this.router.navigate(['/signup']);
  }

  loginClicked() {
    this.router.navigate(['/login']);
  }

  navigateToHome() {
    if (this.authService.isLogged()) {
      this.router.navigate(['/notes']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToCreate() {
    if (this.authService.isLogged()) {
      this.router.navigate(['/create-note']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
