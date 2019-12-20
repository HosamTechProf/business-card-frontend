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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FriendsProvider } from '../../providers/friendsProvider';
import { SERVER_URL } from '../../providers/serverUrl';
/**
 * Generated class for the MyCardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyCardsPage = /** @class */ (function () {
    function MyCardsPage(modalCtrl, friendsProvider, navCtrl, navParams) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.friendsProvider = friendsProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spinner = true;
        this.friendsProvider.getFriends('api/auth/getFriends').subscribe(function (res) {
            _this.spinner = false;
            _this.friends = res;
            _this.friendImage = SERVER_URL + 'img/users/';
        });
    }
    MyCardsPage.prototype.openModal = function (id) {
        var _this = this;
        var profileModal = this.modalCtrl.create('FriendCardPage', { id: id });
        profileModal.onDidDismiss(function (data) {
            _this.friends = data.friends;
        });
        profileModal.present();
    };
    MyCardsPage.prototype.search = function () {
        var _this = this;
        this.friendsProvider.search('api/auth/user/followings/' + localStorage['user_id'] + '/' + this.name).subscribe(function (res) {
            _this.friends = res;
        });
    };
    MyCardsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-cards',
            templateUrl: 'my-cards.html',
        }),
        __metadata("design:paramtypes", [ModalController, FriendsProvider, NavController, NavParams])
    ], MyCardsPage);
    return MyCardsPage;
}());
export { MyCardsPage };
//# sourceMappingURL=my-cards.js.map