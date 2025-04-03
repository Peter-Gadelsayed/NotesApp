import { Component } from '@angular/core';
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { HomeComponent } from "./core/home/home.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'notes-app';
}
