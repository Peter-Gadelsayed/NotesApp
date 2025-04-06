import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/authantications/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isMenuOpen = false;
  isLogged = false;

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authservice.isLogged()
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signupClicked() {
    this.router.navigate(['/signup']);
  }

  loginClicked() {
    this.router.navigate(['/login']);
  }

  logoutClicked() {
    this.authservice.logout();
    this.router.navigate(['/login']);
    this.isLogged = false;
  }

  navigateToHome() {
    if (this.authservice.isLogged()) {
      this.router.navigate(['/notes']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToCreate() {
    if (this.authservice.isLogged()) {
      this.router.navigate(['notes/create']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
