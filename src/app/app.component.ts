import { Component, ViewChild, ElementRef, AfterViewInit, AfterContentInit, AfterViewChecked, Inject, HostListener } from '@angular/core';
import { ScrollService } from './scroll.service';
import { NavComponent } from './nav/nav.component';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from './window.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'app';
  constructor(private scrollService: ScrollService,
    ) {

  }
}
