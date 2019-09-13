import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SERVER_URL } from './serverUrl';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {
    server: string = SERVER_URL;

  constructor(public http: HttpClient) {}

    addDeviceToken(file, info) {
        return this.http.post(this.server + file, info).map(res => res);
    }

}
