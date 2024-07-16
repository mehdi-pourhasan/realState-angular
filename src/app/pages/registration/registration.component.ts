import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  masterService = inject(MasterService);
  router = inject(Router);

  isAgent: boolean = false;

  registerObj: any = {
    userId: 0,
    userName: '',
    emailId: '',
    fullName: '',
    role: '',
    createdDate: new Date(),
    password: '',
    projectName: '',
    // refreshToken: '',
    // refreshTokenExpiryTime: '',
  };

  onRegister() {
    if (this.isAgent) {
      this.masterService.addAgent(this.registerObj).subscribe((res: any) => {
        if (res.result) {
          alert('Registration successfull');
          this.router.navigateByUrl('login');
        }
      });
    } else {
      this.masterService.addCustomer(this.registerObj).subscribe((res: any) => {
        if (res.result) {
          alert('Registration successfull');
          this.router.navigateByUrl('login');
        }
      });
    }
  }
}
