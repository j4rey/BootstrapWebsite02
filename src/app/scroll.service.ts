import { EventEmitter } from '@angular/core';



export class ScrollService {
    onScrollCalled = new EventEmitter<string>();
}
