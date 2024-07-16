import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'realstate';

  loggedUserData: any;
  constructor() {
    const localData = localStorage.getItem('realUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  logOut() {
    localStorage.removeItem('realUser');
    this.loggedUserData = undefined;
  }
}
