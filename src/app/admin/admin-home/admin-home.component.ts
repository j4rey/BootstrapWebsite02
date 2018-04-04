import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../website/data-storage.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private dataStorageServie: DataStorageService) {
    this.dataStorageServie.getWebsites();
  }

  ngOnInit() {
  }

}
