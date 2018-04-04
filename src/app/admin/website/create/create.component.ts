import { DataStorageService } from './../data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsiteService, Website, WebsiteDTO } from '../website.service';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class WebsiteCreateComponent implements OnInit {

  website: Website;

  constructor(private websiteService: WebsiteService, private dataStorageServie: DataStorageService) {

  }

  ngOnInit() {
  }

  onAddWebsite(form: NgForm) {
    const value = form.value;
    const newWebsite = new Website(0, value.name, value.websiteurl, false);
    this.dataStorageServie.addWebsite(newWebsite).subscribe(response => {
      if (response === true) {
        this.dataStorageServie.getWebsites();
        form.reset({});
      } else {
        alert('couldn\'t save data');
      }
    });
  }
}
