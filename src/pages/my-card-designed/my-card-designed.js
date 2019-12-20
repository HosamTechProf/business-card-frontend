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
import { SERVER_URL } from '../../providers/serverUrl';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ShareLinkProvider } from '../../providers/shareLink';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
var MyCardDesignedPage = /** @class */ (function () {
    function MyCardDesignedPage(translateService, alertCtrl, shareLinkProvider, socialSharing, view, friendsProvider, navCtrl, navParams) {
        var _this = this;
        this.translateService = translateService;
        this.alertCtrl = alertCtrl;
        this.shareLinkProvider = shareLinkProvider;
        this.socialSharing = socialSharing;
        this.view = view;
        this.friendsProvider = friendsProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.myId = localStorage['user_id'];
        this.loading = true;
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
            _this.loading = false;
        });
    }
    MyCardDesignedPage.prototype.closeModal = function () {
        var data = 'noEdit';
        this.view.dismiss(data);
    };
    MyCardDesignedPage.prototype.edit = function () {
        this.view.dismiss();
        this.navCtrl.push("MyCardPage");
    };
    MyCardDesignedPage.prototype.shareLink = function (message, subject, file) {
        var _this = this;
        if (message === void 0) { message = 'My Business Card Link: '; }
        if (subject === void 0) { subject = null; }
        if (file === void 0) { file = null; }
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var lengthOfCode = 15;
        this.token = this.makeRandom(lengthOfCode, possible);
        var info = {
            'user_id': this.myId,
            'token': this.token
        };
        this.shareLinkProvider.share('api/auth/share', info).subscribe(function (res) {
            _this.socialSharing.share(message, subject, file, SERVER_URL + 'user/' + _this.myId + '/' + res['token']);
        });
    };
    MyCardDesignedPage.prototype.makeRandom = function (lengthOfCode, possible) {
        var text = "";
        for (var i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    MyCardDesignedPage.prototype.generateToken = function () {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var lengthOfCode = 15;
        this.token = this.makeRandom(lengthOfCode, possible);
        console.log(this.token);
    };
    MyCardDesignedPage.prototype.sharelinkAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: this.translateService.instant("ShareMyCard"),
            message: this.translateService.instant("ShareMsg"),
            buttons: [
                {
                    text: this.translateService.instant("Cancel"),
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: this.translateService.instant("SHARE"),
                    handler: function () {
                        _this.shareLink();
                    }
                }
            ]
        });
        alert.present();
    };
    MyCardDesignedPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-card-designed',
            templateUrl: 'my-card-designed.html',
        }),
        __metadata("design:paramtypes", [TranslateService, AlertController, ShareLinkProvider, SocialSharing, ViewController, FriendsProvider, NavController, NavParams])
    ], MyCardDesignedPage);
    return MyCardDesignedPage;
}());
export { MyCardDesignedPage };
//# sourceMappingURL=my-card-designed.js.map