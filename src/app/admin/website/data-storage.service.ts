import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { retry } from 'rxjs/operator/retry';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { WebsiteService, Website, WebsiteDTO } from './website.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataStorageService {

    websites;
    constructor(private http: Http, private websiteService: WebsiteService) {

    }

    getOptions() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', `application/json`);

        return new RequestOptions({ headers: headers });
    }

    getWebsites() {
        this.http.get('http://localhost:5384/api/Websites') // , this.getOptions());
            .retry(3)
            .subscribe(response => {
                if (response.status === 200) {
                    const websites: WebsiteDTO[] = response.json();
                    this.websiteService.setWebsites(websites);
                }
            });
    }

    getWebsite(id: number) {
        return this.http.get('http://localhost:5384/api/Websites/' + id)
            .map(response => {
                if (response.status === 200) {
                    const website: WebsiteDTO = response.json();
                    this.websiteService.setWebsite(website);
                    return true;
                } else {
                    return false;
                }
            },
                (err) => {
                    // alert('Error in fetching data');
                    return false;
                });
    }

    addWebsite(newwebsite: Website): Observable<boolean> {
        return this.http.post('http://localhost:5384/api/Websites', newwebsite, this.getOptions())
            .map(response => {
                console.log('response:');
                console.log(response);
                if (response.status === 200 || response.status === 201) {
                    this.getWebsites();
                    return true;
                } else { return false; }
            }, err => {
                console.log('err:');
                console.log(err);
                return false;
            });
    }
    updateWebsite(website: Website): Observable<boolean> {
        return this.http.put('http://localhost:5384/api/Websites/' + website.Id, website, this.getOptions())
            .map((response) => {
                if (response.status === 200 || response.status === 204) {
                    this.getWebsite(website.Id);
                    return true;
                }
            }, (err) => {
                return false;
            });
    }

    private handleError(error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    }

    updateHome(newhome: any): any {
        return this.http.put('http://localhost:5384/api/HomeSections/' + newhome.Id, newhome, this.getOptions())
            .map((response) => {
                console.log(response);
                if (response.status === 200 || response.status === 204) {
                    //     this.getWebsite(website.Id);
                    return true;
                }
            }, (err) => {
                console.log(err);
                return false;
            });
    }

    updateAbout(newabout: any): any {
        return this.http.put('http://localhost:5384/api/AboutSections/' + newabout.Id, newabout, this.getOptions())
            .map((response) => {
                console.log(response);
                if (response.status === 200 || response.status === 204) {
                    //     this.getWebsite(website.Id);
                    return true;
                }
            }, (err) => {
                console.log(err);
                return false;
            });
    }
    updateDownload(newdownload: any): any {
        return this.http.put('http://localhost:5384/api/DownloadSections/' + newdownload.Id, newdownload, this.getOptions())
            .map((response) => {
                console.log(response);
                if (response.status === 200 || response.status === 204) {
                    //     this.getWebsite(website.Id);
                    return true;
                }
            }, (err) => {
                console.log(err);
                return false;
            });
    }
    updateContactUs(newcontactus: any): any {
        return this.http.put('http://localhost:5384/api/ContactUsSections/' + newcontactus.Id, newcontactus, this.getOptions())
        .map((response) => {
            console.log(response);
            if (response.status === 200 || response.status === 204) {
                //     this.getWebsite(website.Id);
                return true;
            }
        }, (err) => {
            console.log(err);
            return false;
        });
    }
}
