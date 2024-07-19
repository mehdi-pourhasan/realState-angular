import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  propertyList: any[] = [];
  loggedUserData: any;
  enqObj: any = {
    enquiryId: 0,
    userId: 0,
    propertyId: 0,
    enquiryMessage: '',
    enquiryDate: new Date(),
  };

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.getAllProperties();
    const localData = localStorage.getItem('realUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    }
    this.enqObj.userId = this.loggedUserData.userId;
  }

  getAllProperties() {
    this.masterService.getAllProperty().subscribe((res: any) => {
      this.propertyList = res.data;
    });
  }

  openEnqModel(id: number) {
    this.enqObj.propertyId = id;
    const modal = document.getElementById('exampleModal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closeEnqModal() {
    const modal = document.getElementById('exampleModal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  makeEnq() {
    this.masterService.makeEnquiry(this.enqObj).subscribe((res: any) => {
      if (res.result) {
        alert('Enquiry Send Successfully');
        this.closeEnqModal();
      } else {
        alert(res.message);
      }
    });
  }
}
