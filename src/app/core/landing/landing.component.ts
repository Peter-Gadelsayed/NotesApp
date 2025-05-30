import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/authantications/services/auth.service';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faBullseye, faChevronLeft, faChevronRight, faG, faPencilAlt, fas, faStar, faSyncAlt, faT } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faFacebookF, faGithub, faInstagram, faLinkedinIn, faTelegram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  // FontAwesome Icons
  star = faStar;
  chevronLeft = faChevronLeft;
  chevronRight = faChevronRight;
  arrowLeft = faArrowLeft;
  arrowRight = faArrowRight;
  pencilAlt = faPencilAlt;
  bullseye = faBullseye;
  syncAlt = faSyncAlt;
  facebook = faFacebookF;
  twitter = faTwitter;
  instagram = faInstagram;
  linkedin = faLinkedinIn;
  telegram = faTelegram;
  github = faGithub;
  discord = faDiscord;
  youtube = faYoutube;


  // Define the items array with numbers from 1 to 10
  items = [1, 2, 3, 4, 5];

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

