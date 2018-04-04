import { WebsiteService, Home, Paragraphs } from './../admin/website/website.service';
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
  homedata: Home;
  isReady = false;
  constructor(private scrollService: ScrollService,
    private websiteService: WebsiteService
  ) {
    this.homedata = new Home( 0, 'Grayscale', 'assets/img/intro-bg.jpg',
      0,
      [new Paragraphs(0, 'A free, responsive, one page Bootstrap theme. <br>Created by Start Bootstrap.')],
      true
    );

    const data = this.websiteService.getWebsite();
    if (data != null && data !== undefined && data.home != null) {
      this.homedata.Id = data.home.id;
      this.homedata.Header = data.home.header;
      this.homedata.BackgroundImageUrl = data.home.backgroundImageUrl;
      this.homedata.Paragraphs = data.home.paragraphs;
      this.homedata.isActive = data.home.isActive;
      this.isReady = true;
    }
  }

  ngOnInit() {
    console.log('header ngOnInit()');
    this.websiteService.websiteChanged.subscribe((data: any) => {
      console.log(data);
      if (data !== '' && data !== null) {
        this.homedata.Id = data.home.id;
        this.homedata.Header = data.home.header;
        this.homedata.BackgroundImageUrl = data.home.backgroundImageUrl;
        this.homedata.Paragraphs = data.home.paragraphs;
        this.homedata.isActive = data.home.isActive;
        this.isReady = true;
      }
      console.log(this.homedata);
      console.log(this.isReady);
    });
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
