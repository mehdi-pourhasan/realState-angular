import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  masterService = inject(MasterService);
  router = Inject(Router);

  loginObj: any = {
    userName: '',
    password: '',
  };

  onLogin() {
    this.masterService.login(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert('Login successfull');
        localStorage.setItem('realUser', JSON.stringify(res.data));
        this.masterService.onLogin$.next(true);
        this.router.navigateByUrl('/home');
      } else {
        alert(res.message);
      }
    });
  }
}
