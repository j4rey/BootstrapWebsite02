import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class WebsiteService {

    website;
    websites;
    public websitesChanged: EventEmitter<WebsiteDTO[]> = new EventEmitter<WebsiteDTO[]>();
    public websiteChanged: EventEmitter<WebsiteDTO> = new EventEmitter<WebsiteDTO>();
    constructor() {

    }

    setWebsites(websites: WebsiteDTO[]): void {
        this.websites = websites;
        this.websitesChanged.emit(this.websites.slice());
    }

    setWebsite(website: WebsiteDTO): void {
        this.website = website;
        const copyOfObject = Object.assign({}, website);
        this.websiteChanged.emit(copyOfObject);
    }

    getWebsite(): any {
        return Object.assign({}, this.website);
    }
}
export class WebsiteDTO {
    public Id: number;
    public  Name: string;
    public  WebsiteUrl: string;

        // public string HomeHeader { get; set; }
        // public string HomeBackgroundImageUrl { get; set; }
        // public List<String> HomeParagraphs { get; set; }

        // public string AboutHeader { get; set; }
        // public string AboutBackgroundImageUrl { get; set; }
        // public List<String> AboutParagraphs { get; set; }

        // public string DownloadHeader { get; set; }
        // public string DownloadBackgroundImageUrl { get; set; }
        // public List<String> DownloadParagraphs { get; set; }

        // public string ContactUsHeader { get; set; }
        // public List<String> ContactUsParagraphs { get; set; }
        // public string ContactUsBackgroundImageUrl { get; set; }
        // public List<SocialTypeDTO> Socials { get; set; }
}

export class Website {
    constructor(
        public Id: number,
        public Name: string,
        public WebsiteUrl: string,
        public IsDeleted: boolean
    ) {

    }
}

export class Home {
    constructor(
        public Id: number,
        public Header: string,
        public BackgroundImageUrl: string,
        public WebsiteId: number,
        public Paragraphs: Paragraphs[],
        public isActive: boolean
    ) {}
}
export class About {
    constructor(
        public Id: number,
        public Header: string,
        public BackgroundImageUrl: string,
        public WebsiteId: number,
        public Paragraphs: Paragraphs[],
        public isActive: boolean
    ) {}
}
export class Download {
    constructor(
        public Id: number,
        public Header: string,
        public BackgroundImageUrl: string,
        public WebsiteId: number,
        public Paragraphs: Paragraphs[],
        public isActive: boolean
    ) {}
}
export class ContactUs {
    constructor(
        public Id: number,
        public Header: string,
        public BackgroundImageUrl: string,
        public WebsiteId: number,
        public Paragraphs: Paragraphs[],
        public isActive: boolean,
        public SocialPortals: SocialPortal[]
    ) {}
}
export class Paragraphs {
    constructor(
        public id: number,
        public text: string
    ) {}
}
export class SocialPortal {
    constructor(
        public id: number,
        public url: string,
        public socialtype: SocialType,
        public contactusid: number
    ) {}
}
export class SocialType {
    constructor(
        public id: number,
        public title: string,
        public css: string
    ) {}
}
