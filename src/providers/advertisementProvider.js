var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from './serverUrl';
import 'rxjs/add/operator/map';
import { CacheService } from "ionic-cache";
var AdvertisementProvider = /** @class */ (function () {
    function AdvertisementProvider(http, cache) {
        this.http = http;
        this.cache = cache;
        this.server = SERVER_URL;
    }
    AdvertisementProvider.prototype.getAdvertisements = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromDelayedObservable(this.server + file, advertisements)
    };
    AdvertisementProvider.prototype.getAdvertisementsCount = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromDelayedObservable(this.server + file, counts)
    };
    AdvertisementProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, CacheService])
    ], AdvertisementProvider);
    return AdvertisementProvider;
}());
export { AdvertisementProvider };
//# sourceMappingURL=advertisementProvider.js.map