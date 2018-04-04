import { Download, WebsiteService, Paragraphs } from './../admin/website/website.service';
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
  downloaddata: Download;
  isReady = false;
  minHeight = '';
  constructor(
    private scrollService: ScrollService,
    private websiteService: WebsiteService
  ) {
    this.downloaddata = new Download(0, 'Download Grayscale', 'assets/img/downloads-bg.jpg',
    0,
    [
      new Paragraphs(0, `You can download Grayscale for free on the preview page at Start Bootstrap.`),
      new Paragraphs(1, `<a href="http://startbootstrap.com/template-overviews/grayscale/"
      class="btn btn-default btn-lg">Visit Download Page</a>`)
    ],
    true
  );
  const data = this.websiteService.getWebsite();
  if (data != null && data !== undefined && data.download != null) {
    this.downloaddata.Id = data.download.id;
    this.downloaddata.Header = data.download.header;
    this.downloaddata.BackgroundImageUrl = data.download.backgroundImageUrl;
    this.downloaddata.Paragraphs = data.download.paragraphs;
    this.downloaddata.isActive = data.download.isActive;
    this.isReady = true;
  }
  }

  ngOnInit() {
    this.websiteService.websiteChanged.subscribe((data: any) => {
      if (data !== '' && data !== null && data.download != null) {
        this.downloaddata.Id = data.download.id;
        this.downloaddata.Header = data.download.header;
        this.downloaddata.BackgroundImageUrl = data.download.backgroundImageUrl;
        this.downloaddata.Paragraphs = data.download.paragraphs;
        this.downloaddata.isActive = data.download.isActive;
      }
      this.isReady = true;
    });

    this.minHeight = (window.screen.height) + 'px';
    this.scrollService.onScrollCalled.subscribe((id) => {
      if (id === this.id) {
        this.download.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

}
