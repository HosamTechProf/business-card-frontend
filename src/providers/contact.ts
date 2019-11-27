import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from './serverUrl';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {
    server: string = SERVER_URL;
  constructor(public http: HttpClient) {}

    getContactsFromDatabase(info, file) {
        return this.http.post(this.server + file, info).map(res => res);
    }

    getContacts(file) {
        return this.http.get(this.server + file).map(res => res);
    }

    sendMessage(info, file) {
        return this.http.post(this.server + file, info).map(res => res);
    }
}
