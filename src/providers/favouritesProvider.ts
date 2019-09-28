import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from './serverUrl';
import { CacheService } from "ionic-cache";

@Injectable()

export class FavouritesProvider {
    server: string = SERVER_URL;
    constructor(public http: HttpClient, private cache: CacheService) { }

    addFavourite(info, file) {
        return this.http.post(this.server + file, info)
            .map(res => res);
    }

    removeFavourite(file) {
        return this.http.get(this.server + file).map(res => res);
    }

    isFavorited(file) {
        let isFavorited = this.http.get(this.server + file).map(res => res);
        return this.cache.loadFromDelayedObservable(this.server + file, isFavorited)
    }

    getFavourites(file) {
        let favourites = this.http.get(this.server + file).map(res => res);
        return this.cache.loadFromDelayedObservable(this.server + file, favourites)
    }
}
