import { ScrollService } from './../scroll.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() id: string;
  @ViewChild('header') header: ElementRef;
  imageurl = 'assets/img/intro-bg.jpg';
  constructor(private scrollService: ScrollService) { }

  ngOnInit() {
    this.scrollService.onScrollCalled.subscribe((id) => {
      if (id === this.id) {
        this.header.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
  ScrollTo(id) {
    this.scrollService.onScrollCalled.emit(id);
  }
}
