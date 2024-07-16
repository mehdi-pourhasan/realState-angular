import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from './services/master.service';

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
  constructor(private masterService: MasterService) {
    this.readUser();

    this.masterService.onLogin$.subscribe((res) => {
      this.readUser();
    });
  }

  readUser() {
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
