import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DataStorageService } from './../../../admin/website/data-storage.service';
import { WebsiteService, WebsiteDTO, Website } from './../../../admin/website/website.service';
import { ClientEditService } from '../../clientedit.service';

@Component({
  selector: 'app-clienteditwebsite',
  templateUrl: './editwebsite.component.html',
  styleUrls: ['./editwebsite.component.css']
})
export class EditwebsiteComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  websiteId: number;
  constructor(private dataStorageService: DataStorageService,
    private websiteService: WebsiteService,
    private clientDataService: ClientEditService
  ) {
  }

  ngOnInit() {
    // this.websiteService.websiteChanged.subscribe((data: any) => {
    //   this.clientDataService.websitedataChanged.subscribe((data: any) => {
    // console.log(this.data);
    //   this.websiteId = data.id;
    //    this.form.setValue({
    //      name: this.data.name,
    //       websiteurl: this.data.websiteUrl
    //    });
    // });
    this.websiteService.websiteChanged.subscribe((data: any) => {
      this.websiteId = data.website.id;
      this.form.setValue({
        name: data.website.name,
        websiteurl: data.website.websiteUrl
      });
    });
  }

  onUpdateWebsite(f: NgForm) {
    const value = f.value;
    const newWebsite = new Website(this.websiteId, value.name, value.websiteurl, false);
    this.dataStorageService.updateWebsite(newWebsite).subscribe((d) => {
      if (d === true) {
        alert('data updated.');
      } else {
        alert('data update fail.');
      }
    });
  }
}
