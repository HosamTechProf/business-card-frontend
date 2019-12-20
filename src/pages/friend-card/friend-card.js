var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FriendsProvider } from '../../providers/friendsProvider';
import { FavouritesProvider } from '../../providers/favouritesProvider';
import { SMS } from '@ionic-native/sms';
import { SERVER_URL } from '../../providers/serverUrl';
/**
 * Generated class for the FriendCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FriendCardPage = /** @class */ (function () {
    function FriendCardPage(sms, view, favouritesProvider, friendsProvider, navCtrl, navParams) {
        var _this = this;
        this.sms = sms;
        this.view = view;
        this.favouritesProvider = favouritesProvider;
        this.friendsProvider = friendsProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = true;
        this.spinner = true;
        this.id = this.navParams.get('id');
        var info = {
            id: this.id
        };
        this.friendsProvider.getFriendData('api/auth/getFriendData/' + this.id).subscribe(function (data) {
            _this.name = data['name'];
            _this.phone = data['phone'];
            _this.mobile = data['mobile'];
            _this.email = data['email'];
            _this.desc = data['desc'];
            _this.company = data['company'];
            _this.socialLink = data['socialLink'];
            _this.image = data['image'];
            _this.friendImage = SERVER_URL + 'img/users/';
            _this.spinner = false;
        });
        this.favouritesProvider.isFavorited('api/auth/isfavorited/' + localStorage['user_id'] + '/' + this.id).subscribe(function (data) {
            if (data == 0) {
                _this.faved = false;
            }
            else {
                _this.faved = true;
            }
        });
        this.friendsProvider.isFriend('api/auth/isfriend/' + localStorage['user_id'] + '/' + this.id).subscribe(function (data) {
            _this.loading = false;
            if (data['status'] == 'true') {
                _this.followed = 'true';
            }
            else if (data['status'] == 'false') {
                _this.followed = 'false';
            }
            else {
                _this.followed = 'notFriends';
            }
        });
    }
    FriendCardPage.prototype.closeModal = function () {
        var _this = this;
        this.friendsProvider.getFriends('api/auth/getFriends').subscribe(function (friends) {
            _this.friends = friends;
            _this.friendsProvider.getFriends('api/auth/getFavourites').subscribe(function (favourites) {
                _this.favourites = favourites;
                var data = { friends: _this.friends, favourites: _this.favourites };
                _this.view.dismiss(data);
            });
        });
    };
    FriendCardPage.prototype.follow = function () {
        this.followed = 'false';
        var info = {
            user1_id: localStorage['user_id'],
            user2_id: this.id
        };
        this.friendsProvider.addFriend(info, 'api/auth/addFriend').subscribe();
    };
    FriendCardPage.prototype.unfollow = function () {
        this.followed = 'notFriends';
        var info = {
            user1_id: localStorage['user_id'],
            user2_id: this.id
        };
        this.friendsProvider.deleteFriend(info, 'api/auth/deleteFriend').subscribe();
    };
    FriendCardPage.prototype.favourite = function () {
        this.faved = true;
        var info = {
            user1_id: localStorage['user_id'],
            user2_id: this.id
        };
        this.favouritesProvider.addFavourite(info, 'api/auth/addFavourite').subscribe();
    };
    FriendCardPage.prototype.unfavourite = function () {
        this.faved = false;
        this.favouritesProvider.removeFavourite('api/auth/removefavourite/' + localStorage['user_id'] + '/' + this.id).subscribe();
    };
    FriendCardPage.prototype.sendSMS = function () {
        var options = {
            replaceLineBreaks: false,
            android: {
                intent: 'INTENT'
            }
        };
        this.sms.send(this.mobile, '', options);
    };
    FriendCardPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-friend-card',
            templateUrl: 'friend-card.html',
        }),
        __metadata("design:paramtypes", [SMS, ViewController, FavouritesProvider, FriendsProvider, NavController, NavParams])
    ], FriendCardPage);
    return FriendCardPage;
}());
export { FriendCardPage };
//# sourceMappingURL=friend-card.js.map