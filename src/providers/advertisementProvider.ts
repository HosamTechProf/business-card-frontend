import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from './serverUrl';
import 'rxjs/add/operator/map';

@Injectable()

export class AdvertisementProvider {

    server: string = SERVER_URL;

  constructor(public http: HttpClient) {}

    getAdvertisements(file){
        return this.http.get(this.server + file).map(res => res);
    }

    getAdvertisementsCount(file){
        return this.http.get(this.server + file).map(res => res);
    }

}
