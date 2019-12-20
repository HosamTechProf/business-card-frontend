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
import { FavouritesProvider } from '../../providers/favouritesProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { SMS } from '@ionic-native/sms';
var FavouritesPage = /** @class */ (function () {
    function FavouritesPage(sms, modalCtrl, favouritesProvider, navCtrl, navParams) {
        var _this = this;
        this.sms = sms;
        this.modalCtrl = modalCtrl;
        this.favouritesProvider = favouritesProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spinner = true;
        this.favouritesProvider.getFavourites('api/auth/getFavourites').subscribe(function (data) {
            _this.spinner = false;
            _this.favourites = data;
            _this.userImage = SERVER_URL + 'img/users/';
        });
    }
    FavouritesPage.prototype.openFriendCard = function (id) {
        var _this = this;
        var profileModal = this.modalCtrl.create('FriendCardPage', { id: id });
        profileModal.onDidDismiss(function (data) {
            _this.favourites = data['favourites'];
        });
        profileModal.present();
    };
    FavouritesPage.prototype.sendSMS = function (mobile) {
        var options = {
            replaceLineBreaks: false,
            android: {
                intent: 'INTENT'
            }
        };
        this.sms.send(mobile, '', options);
    };
    FavouritesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-favourites',
            templateUrl: 'favourites.html',
        }),
        __metadata("design:paramtypes", [SMS, ModalController, FavouritesProvider, NavController, NavParams])
    ], FavouritesPage);
    return FavouritesPage;
}());
export { FavouritesPage };
//# sourceMappingURL=favourites.js.map