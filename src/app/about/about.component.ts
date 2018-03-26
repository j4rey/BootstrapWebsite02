import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Input() id: string;
  @ViewChild('about') about: ElementRef;
  imageurl = 'assets/img/intro-bg.jpg';
  minHeight = '';
  constructor(private scrollService: ScrollService) { }

  ngOnInit() {
    this.minHeight = (window.screen.height) + 'px';
    this.scrollService.onScrollCalled.subscribe((id) => {
      if (id === this.id) {
        this.about.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

}
