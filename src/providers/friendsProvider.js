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
var FriendsProvider = /** @class */ (function () {
    function FriendsProvider(http, cache) {
        this.http = http;
        this.cache = cache;
        this.server = SERVER_URL;
    }
    FriendsProvider.prototype.addFriend = function (info, file) {
        return this.http.post(this.server + file, info)
            .map(function (res) { return res; });
    };
    FriendsProvider.prototype.addFriendFromGalleryBackend = function (info, file) {
        return this.http.post(this.server + file, info)
            .map(function (res) { return res; });
    };
    FriendsProvider.prototype.addFriendFromGallery = function (file) {
        return this.http.get(this.server + file)
            .map(function (res) { return res; });
    };
    FriendsProvider.prototype.deleteFriend = function (info, file) {
        return this.http.post(this.server + file, info)
            .map(function (res) { return res; });
    };
    FriendsProvider.prototype.isFriend = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromObservable(this.server + file, isFriend)
    };
    FriendsProvider.prototype.getFriends = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromObservable(this.server + file, friends)
    };
    FriendsProvider.prototype.getFriendData = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromObservable(this.server + file, friend)
    };
    FriendsProvider.prototype.acceptFollowRequest = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromObservable(this.server + file, friend)
    };
    FriendsProvider.prototype.getFollowRequests = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromObservable(this.server + file, friend)
    };
    FriendsProvider.prototype.getFollowRequestsCount = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromObservable(this.server + file, friend)
    };
    FriendsProvider.prototype.search = function (file) {
        return this.http.get(this.server + file).map(function (res) { return res; });
        // return this.cache.loadFromObservable(this.server + file, friend)
    };
    FriendsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, CacheService])
    ], FriendsProvider);
    return FriendsProvider;
}());
export { FriendsProvider };
//# sourceMappingURL=friendsProvider.js.map