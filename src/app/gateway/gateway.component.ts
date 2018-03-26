import { WINDOW, WINDOW_PROVIDERS } from './../window.service';
import { ScrollService } from './../scroll.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css']
})
export class GatewayComponent implements OnInit {
  @Input() id: string;
  @ViewChild('download') download: ElementRef;
  imageurl = 'assets/img/downloads-bg.jpg';
  minHeight= '';
  constructor(private scrollService: ScrollService) { }

  ngOnInit() {
    this.minHeight = (window.screen.height) + 'px';
    console.log(this.minHeight);
    this.scrollService.onScrollCalled.subscribe((id) => {
      if (id === this.id) {
        this.download.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

}
