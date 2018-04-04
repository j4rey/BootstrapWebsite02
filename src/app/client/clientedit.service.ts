import { EventEmitter } from '@angular/core';

export class ClientEditService {
    public websitedataChanged: EventEmitter<any> = new EventEmitter<any>();
    public homedataChanged: EventEmitter<any> = new EventEmitter<any>();
}
