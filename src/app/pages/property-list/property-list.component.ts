import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
})
export class PropertyListComponent implements OnInit {
  isListView: boolean = false;

  propertyObj: any = {
    propertyId: 0,
    title: '',
    description: '',
    propertyType: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    agentId: 0,
    price: 0,
    createdDate: new Date(),
    thumbnailImage: '',
    RealPropertyImages: [
      // {
      //   propertyImageId: 0,
      //   propertyId: 0,
      //   imageUrl: '',
      //   orderNo: 0,
      // },
    ],
  };

  propertyList: any[] = [];

  masterService = inject(MasterService);

  loggedUserData: any;

  ngOnInit(): void {
    const localData = localStorage.getItem('realUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
      this.propertyObj.agentId = this.loggedUserData.userId;
    }
    this.getAllProperty();
  }

  getAllProperty() {
    this.masterService.getAllProperty().subscribe((res: any) => {
      const allList = res.data;
      this.propertyList = allList.filter(
        (m: any) => m.agentId == this.loggedUserData.userId
      );
    });
  }

  createProperty() {
    this.masterService.addProperty(this.propertyObj).subscribe((res: any) => {
      if (res.result) {
        alert('Property created successfully.');
        this.getAllProperty();
      } else {
        alert(res.message);
      }
    });
  }

  onEditProperty(data: any) {
    this.propertyObj = data;
    this.isListView = false;
  }
  updateProperty() {
    this.masterService
      .updateProperty(this.propertyObj)
      .subscribe((res: any) => {
        if (res.result) {
          alert('Property updated successfully.');
          this.getAllProperty();
        } else {
          alert(res.message);
        }
      });
  }

  onDeleteItem(id: number) {
    const isDelete = confirm('Are you sure you want to delete ?');
    if (isDelete) {
      this.masterService.deleteProperty(id).subscribe((res: any) => {
        if (res.result) {
          alert('Property deleted successfully.');
          this.getAllProperty();
        } else {
          alert(res.message);
        }
      });
    }
  }
}
