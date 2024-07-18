import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  propertyList: any[] = [];
  masterService = inject(MasterService);

  ngOnInit(): void {
    this.getAllProperties();
  }

  getAllProperties() {
    this.masterService.getAllProperty().subscribe((res: any) => {
      this.propertyList = res.data;
    });
  }
}
