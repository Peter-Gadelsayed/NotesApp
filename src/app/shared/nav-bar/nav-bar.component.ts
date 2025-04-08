import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/authantications/auth.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isMenuOpen = false;
  isLogged = false;

  constructor(private router: Router, private authservice: AuthService, private alert: AlertService) { }

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
    this.alert.confirm("Log out", "Are you sure you want to logout?", "Yes, Logout", () => {
      this.authservice.logout();
      this.alert.success("Logged out", "Logged out successfully");
      this.router.navigate(['/login']);
      this.isLogged = false;
    });
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
