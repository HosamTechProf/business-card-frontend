import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from './serverUrl';
import 'rxjs/add/operator/map';
import { CacheService } from "ionic-cache";

@Injectable()

export class AdvertisementProvider {
    server: string = SERVER_URL;

    constructor(public http: HttpClient, private cache: CacheService) { }

    getAdvertisements(file) {
        return this.http.get(this.server + file).map(res => res);
        // return this.cache.loadFromDelayedObservable(this.server + file, advertisements)
    }

    getAdvertisementsCount(file) {
        return this.http.get(this.server + file).map(res => res);
        // return this.cache.loadFromDelayedObservable(this.server + file, counts)
    }
}
