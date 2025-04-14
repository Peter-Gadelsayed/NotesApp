import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/authantications/auth.service';
import { AlertService } from '../alert/alert.service';
import { faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  // FontAwesome Icons
  rightFromBracket = faRightFromBracket;
  rightToBracket = faRightFromBracket;
  userPlus = faUserPlus;


  isLogged = false;
  isHomeActive = false;
  isCreateActive = false;

  constructor(private router: Router, private authservice: AuthService, private alert: AlertService) { }

  ngOnInit(): void {
    this.isLogged = this.authservice.isLogged();
    this.setActiveLink("home");
  }

  signupClicked() {
    this.router.navigate(['/signup']);
  }

  loginClicked() {
    this.router.navigate(['/login']);
  }

  logoutClicked() {
    this.alert.confirm("Log out !", "Are you sure you want to logout?", "Logout", "Cancel", () => {
      this.authservice.logout();
      this.alert.success("Logged out", "Logged out successfully");
      this.router.navigate(['/login']);
      this.isLogged = false;
      this.setActiveLink();
    });
  }

  navigateTo(path: string, activeLink: string = 'home') {
    if (this.authservice.isLogged()) {
      this.router.navigate([path]);
      this.setActiveLink(activeLink);
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToHome() {
    this.navigateTo('/notes', 'home');
  }

  navigateToCreate() {
    this.navigateTo('/notes/create', 'create');
  }

  navigateToLanding() {
    this.router.navigate(['/landing']);
  }

  setActiveLink(activeLink?: string) {
    this.isHomeActive = activeLink === 'home';
    this.isCreateActive = activeLink === 'create';
  }
}


