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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FriendsProvider } from '../../providers/friendsProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the FollowRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FollowRequestsPage = /** @class */ (function () {
    function FollowRequestsPage(translateService, alertCtrl, friendsProvider, navCtrl, navParams) {
        var _this = this;
        this.translateService = translateService;
        this.alertCtrl = alertCtrl;
        this.friendsProvider = friendsProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.friendsProvider.getFollowRequests('api/auth/getfollowrequests').subscribe(function (res) {
            _this.spinner = false;
            _this.friends = res;
            _this.friendImage = SERVER_URL + 'img/users/';
        });
    }
    FollowRequestsPage.prototype.acceptFollow = function (friendId, friendName) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: this.translateService.instant("AcceptRequest"),
            message: this.translateService.instant("AcceptRequestMsg") + friendName,
            buttons: [
                {
                    text: this.translateService.instant("Cancel"),
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: this.translateService.instant("Accept"),
                    handler: function () {
                        _this.friendsProvider.acceptFollowRequest('api/auth/user/acceptfollowrequest/' + friendId + '/' + localStorage['user_id']).subscribe(function (res) {
                            _this.friendsProvider.getFollowRequests('api/auth/getfollowrequests').subscribe(function (res) {
                                _this.friends = res;
                                _this.friendImage = SERVER_URL + 'img/users/';
                            });
                        });
                    }
                },
                {
                    text: this.translateService.instant("AcceptAndFollowBack"),
                    handler: function () {
                        _this.friendsProvider.acceptFollowRequest('api/auth/user/acceptfollowrequest/' + friendId + '/' + localStorage['user_id']).subscribe(function (res) {
                            _this.friendsProvider.getFollowRequests('api/auth/getfollowrequests').subscribe(function (res) {
                                _this.friends = res;
                                _this.friendImage = SERVER_URL + 'img/users/';
                            });
                        });
                        var info = {
                            user1_id: localStorage['user_id'],
                            user2_id: friendId
                        };
                        _this.friendsProvider.isFriend('api/auth/isfriend/' + localStorage['user_id'] + '/' + friendId).subscribe(function (res) {
                            if (res['status'] === 'notFriends') {
                                _this.friendsProvider.addFriend(info, 'api/auth/addFriend').subscribe();
                            }
                            else {
                                _this.followAlert();
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    FollowRequestsPage.prototype.followAlert = function () {
        alert('انت بالفعل تتابع هذه البطاقة , ولكن تم قبول طلب متابعته');
    };
    FollowRequestsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-follow-requests',
            templateUrl: 'follow-requests.html',
        }),
        __metadata("design:paramtypes", [TranslateService, AlertController, FriendsProvider, NavController, NavParams])
    ], FollowRequestsPage);
    return FollowRequestsPage;
}());
export { FollowRequestsPage };
//# sourceMappingURL=follow-requests.js.map