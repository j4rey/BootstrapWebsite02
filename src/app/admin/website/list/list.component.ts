import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsiteDTO, WebsiteService } from '../website.service';
import { DataStorageService } from '../data-storage.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-website-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class WebsiteListComponent implements OnInit, OnDestroy {
  websites: WebsiteDTO[];
  websiteSubscription: Subscription;

  constructor(private websiteService: WebsiteService, private dataStorageServie: DataStorageService) {
  }

  ngOnInit() {
    this.websiteSubscription = this.websiteService.websitesChanged.subscribe((data: WebsiteDTO[]) => {
      // console.log(data);
      this.websites = data;
    });
  }
  ngOnDestroy(): void {
    if (this.websiteSubscription != null) { this.websiteSubscription.unsubscribe(); }
  }
}
