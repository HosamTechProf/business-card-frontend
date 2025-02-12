import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from './serverUrl';
import { CacheService } from "ionic-cache";

@Injectable()

export class AuthProvider {
    server: string = SERVER_URL;
    constructor(public http: HttpClient, private cache: CacheService) { }

    registerData(info, file) {
        return this.http.post(this.server + file, info)
            .map(res => res);
    }

    getUserData(file) {
        return this.http.get(this.server + file).map(res => res);
        // return this.cache.loadFromDelayedObservable(this.server + file, user)
    }

    getCountries(file) {
        return this.http.get(this.server + file).map(res => res);
        // return this.cache.loadFromDelayedObservable(this.server + file, countries)
    }

    updateUserData(info, file) {
        return this.http.post(this.server + file, info)
            .map(res => res);
    }

    search(info, file) {
        return this.http.post(this.server + file, info)
            .map(res => res);
    }

    verifyCode(info, file) {
        return this.http.post(this.server + file, info)
            .map(res => res);
    }

    sendCode(info, file) {
        return this.http.post(this.server + file, info)
            .map(res => res);
    }

    tokenCheck(file) {
        return this.http.get(this.server + file)
            .map(res => res);
    }

}
