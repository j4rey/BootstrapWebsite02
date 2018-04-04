import { ClientEditService } from './../clientedit.service';
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../admin/website/data-storage.service';
import { WebsiteService } from '../../admin/website/website.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  oneAtATime = true;
  websitedata: any;
  websitefound= false;
  constructor(private dataStorageService: DataStorageService,
    private websiteService: WebsiteService,
  private clientDataService: ClientEditService) { }

  ngOnInit() {
    this.dataStorageService.getWebsite(1).subscribe((data) => {
      this.websitefound = data;
    });
    this.websiteService.websiteChanged.subscribe((data: any) => {
      this.websitedata = data;
      console.log(this.websitedata);
    });
  }
  websiteOpenChange(event: boolean) {
    // console.log(`Accordion has been ${event ? 'opened' : 'closed'}`);
    if (event === true) {
      // fetch data
      // this.clientDataService.websitedataChanged.emit(this.websitedata.website);
    }
  }
  homeOpenChange(event: boolean) {
    // console.log(`websitelog has been ${event ? 'opened' : 'closed'}`);
  }
  aboutOpenChange(event: boolean) {
    // console.log(`homelog has been ${event ? 'opened' : 'closed'}`);
  }
  downloadOpenChange(event: boolean) {
    // console.log(`homelog has been ${event ? 'opened' : 'closed'}`);
  }
  contactusOpenChange(event: boolean) {
    // console.log(`homelog has been ${event ? 'opened' : 'closed'}`);
  }
}
