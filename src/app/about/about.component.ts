import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { About, WebsiteService, Paragraphs } from '../admin/website/website.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Input() id: string;
  @ViewChild('about') about: ElementRef;
  aboutdata: About;
  isReady = false;
  minHeight = '';
  constructor(private scrollService: ScrollService,
    private websiteService: WebsiteService) {
    this.aboutdata = new About(0, 'About Grayscale', 'assets/img/intro-bg.jpg',
      0,
      [
        new Paragraphs(0, `Grayscale is a free Bootstrap theme created by Start Bootstrap.
            It can be yours right now, simply download the template on
        <a href="http://startbootstrap.com/template-overviews/grayscale/">the preview page</a>.
        The theme is open source, and you can use it for any purpose, personal or commercial.`),
        new Paragraphs(1, `This theme features stock photos by
        <a href="http://gratisography.com/">Gratisography</a>
        along with a custom Google Maps skin courtesy of
        <a href="http://snazzymaps.com/">Snazzy Maps</a>.`),
        new Paragraphs(2, `Grayscale includes full HTML, CSS, and custom JavaScript files
        along with SASS and LESS files for easy customization!`)
      ],
      true
    );

    const data = this.websiteService.getWebsite();
    if (data != null && data !== undefined && data.about != null) {
      this.aboutdata.Id = data.about.id;
      this.aboutdata.Header = data.about.header;
      this.aboutdata.BackgroundImageUrl = data.about.backgroundImageUrl;
      this.aboutdata.Paragraphs = data.about.paragraphs;
      this.aboutdata.isActive = data.about.isActive;
      this.isReady = true;
    }
  }

  ngOnInit() {
    this.websiteService.websiteChanged.subscribe((data: any) => {
      if (data !== '' && data !== null) {
        this.aboutdata.Id = data.about.id;
        this.aboutdata.Header = data.about.header;
        this.aboutdata.BackgroundImageUrl = data.about.backgroundImageUrl;
        this.aboutdata.Paragraphs = data.about.paragraphs;
        this.aboutdata.isActive = data.about.isActive;
      }
      this.isReady = true;
    });

    this.minHeight = (window.screen.height) + 'px';
    this.scrollService.onScrollCalled.subscribe((id) => {
      if (id === this.id) {
        this.about.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

}
