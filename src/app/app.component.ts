import { DataStorageService } from './admin/website/data-storage.service';
import { Component, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, Inject, HostListener, OnInit } from '@angular/core';
import { ScrollService } from './scroll.service';
import { NavComponent } from './nav/nav.component';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from './window.service';
import { WebsiteService } from './admin/website/website.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  websitefound = false;
  constructor(private scrollService: ScrollService,
    private dataStorageService: DataStorageService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    console.log('app ngOnInit()');
    this.dataStorageService.getWebsite(1).subscribe((data) => {
      this.websitefound = data;
    },
      (err) => {
        console.log('failed to fetch website data');
        this.route.navigate(['error']);
      });
  }
}
