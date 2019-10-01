import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from './serverUrl';
import { CacheService } from "ionic-cache";

@Injectable()

export class FriendsProvider {
    server: string = SERVER_URL;

    constructor(public http: HttpClient, private cache: CacheService) { }

    addFriend(info, file) {
        return this.http.post(this.server + file, info)
            .map(res => res);
    }

    deleteFriend(info, file) {
        return this.http.post(this.server + file, info)
            .map(res => res);
    }

    isFriend(file) {
        return this.http.get(this.server + file).map(res => res)
        // return this.cache.loadFromObservable(this.server + file, isFriend)
    }

    getFriends(file) {
        return this.http.get(this.server + file).map(res => res)
        // return this.cache.loadFromObservable(this.server + file, friends)
    }

    getFriendData(file) {
        return this.http.get(this.server + file).map(res => res)
        // return this.cache.loadFromObservable(this.server + file, friend)
    }

    search(file) {
        return this.http.get(this.server + file).map(res => res)
        // return this.cache.loadFromObservable(this.server + file, friend)
    }
}
