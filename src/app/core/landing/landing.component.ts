import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/authantications/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
  navigateToCreate() {
    if (this.authService.isLogged()) {
      this.router.navigate(['/notes/create']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

