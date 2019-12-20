var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from './serverUrl';
import { CacheService } from "ionic-cache";
var AuthProvider = /** @class */ (function () {
    function AuthProvider(http, cache) {
        this.http = http;
        this.cache = cache;
        this.server = SERVER_URL;
    }
    AuthProvider.prototype.registerData = function (info, file) {
        return this.http.post(this.server + file, info)
            .map(function (res) { return res; });
    };
    AuthProvider.prototype.getUserData = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromDelayedObservable(this.server + file, user)
    };
    AuthProvider.prototype.getCountries = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromDelayedObservable(this.server + file, countries)
    };
    AuthProvider.prototype.updateUserData = function (info, file) {
        return this.http.post(this.server + file, info)
            .map(function (res) { return res; });
    };
    AuthProvider.prototype.search = function (info, file) {
        return this.http.post(this.server + file, info)
            .map(function (res) { return res; });
    };
    AuthProvider.prototype.verifyCode = function (info, file) {
        return this.http.post(this.server + file, info)
            .map(function (res) { return res; });
    };
    AuthProvider.prototype.sendCode = function (info, file) {
        return this.http.post(this.server + file, info)
            .map(function (res) { return res; });
    };
    AuthProvider.prototype.tokenCheck = function (file) {
        return this.http.get(this.server + file)
            .map(function (res) { return res; });
    };
    AuthProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, CacheService])
    ], AuthProvider);
    return AuthProvider;
}());
export { AuthProvider };
//# sourceMappingURL=authProvider.js.map