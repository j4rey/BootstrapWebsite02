
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { ContactUs, WebsiteService, Paragraphs, SocialPortal, SocialType } from '../admin/website/website.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  @Input() id: string;
  @ViewChild('contactus') contactus: ElementRef;
  lat = 51.678418;
  lng = 7.809007;
  minHeight = '';
  imageurl = '';
  contactusdata: ContactUs;
  isReady = false;
  constructor(private scrollService: ScrollService,
    private websiteService: WebsiteService) {
    this.contactusdata = new ContactUs(0, 'Contact Start Bootstrap', '',
      0,
      [
        new Paragraphs(0, `Feel free to leave us a comment on the
      <a href="http://startbootstrap.com/template-overviews/grayscale/">Grayscale template overview page</a>
      on Start Bootstrap to give some feedback about this theme!`)
      ],
      true,
      [
        new SocialPortal(0,
          'https://twitter.com/SBootstrap',
          new SocialType(0, 'Twitter', 'fa-twitter'),
          0
        ),
        new SocialPortal(0,
          'https://github.com/BlackrockDigital/startbootstrap',
          new SocialType(0, 'Github', 'fa-github'),
          0
        ),
        new SocialPortal(0,
          'https://plus.google.com/+Startbootstrap/posts',
          new SocialType(0, 'Google+', 'fa-google-plus'),
          0
        ),
        new SocialPortal(0,
          'https://twitter.com/SBootstrap',
          new SocialType(0, 'Facebook', 'fa-facebook'),
          0
        )
      ]
    );

    const data = this.websiteService.getWebsite();
    if (data != null && data !== undefined && data.contactus != null) {
      this.contactusdata.Id = data.contactus.id;
      this.contactusdata.Header = data.contactus.header;
      this.contactusdata.BackgroundImageUrl = data.contactus.backgroundImageUrl;
      this.contactusdata.Paragraphs = data.contactus.paragraphs;
      this.contactusdata.isActive = data.contactus.isActive;
      console.log(data.contactus);
      this.contactusdata.SocialPortals = data.contactus.socialPortals;
      this.isReady = true;
      console.log(this.contactusdata.SocialPortals);
    }
  }

  ngOnInit() {
    this.websiteService.websiteChanged.subscribe((data: any) => {
      if (data !== '' && data !== null && data.contactus != null) {
        this.contactusdata.Id = data.contactus.id;
        this.contactusdata.Header = data.contactus.header;
        this.contactusdata.BackgroundImageUrl = data.contactus.backgroundImageUrl;
        this.contactusdata.Paragraphs = data.contactus.paragraphs;
        this.contactusdata.isActive = data.contactus.isActive;
      }
      this.isReady = true;
    });

    this.minHeight = (window.screen.height) + 'px';
    this.scrollService.onScrollCalled.subscribe((id) => {
      if (id === this.id) {
        this.contactus.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

}
