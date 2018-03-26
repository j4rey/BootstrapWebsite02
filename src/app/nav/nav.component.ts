import { ScrollService } from './../scroll.service';
import { Component, OnInit, ViewChild, ElementRef, Inject, HostListener } from '@angular/core';
import { WINDOW } from '../window.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('button') button: ElementRef;

  public navIsFixed = '';
  constructor(private scrollService: ScrollService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window) { }
  isCollapsed = true;
  ngOnInit() {
  }

  ScrollTo(id, isMenu) {
    this.scrollService.onScrollCalled.emit(id);
    if (isMenu) {
      this.button.nativeElement.click();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number > 100) {
      this.navIsFixed = 'navbar-shrink';
    } else if (this.navIsFixed && number < 10) {
      this.navIsFixed = '';
    }
  }
}
