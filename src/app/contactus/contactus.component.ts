import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  @Input() id: string;
  @ViewChild('contactus') contactus: ElementRef;
  minHeight = '';
  imageurl = '';
  constructor(private scrollService: ScrollService) { }

  ngOnInit() {
    this.minHeight = (window.screen.height) + 'px';
    this.scrollService.onScrollCalled.subscribe((id) => {
      if (id === this.id) {
        this.contactus.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

}
