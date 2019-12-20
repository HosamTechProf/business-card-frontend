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
import { IonicPage, Events, ModalController, App, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ShareLinkProvider } from '../../providers/shareLink';
import { SERVER_URL } from '../../providers/serverUrl';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { FriendsProvider } from '../../providers/friendsProvider';
var TabsPage = /** @class */ (function () {
    function TabsPage(nav, friendsProvider, http, camera, toastCtrl, translateService, alertCtrl, shareLinkProvider, socialSharing, storage, app, modalCtrl, events) {
        this.nav = nav;
        this.friendsProvider = friendsProvider;
        this.http = http;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.alertCtrl = alertCtrl;
        this.shareLinkProvider = shareLinkProvider;
        this.socialSharing = socialSharing;
        this.storage = storage;
        this.app = app;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.tab1Root = "HomePage";
        this.tab4Root = "AboutPage";
        this.myId = localStorage['user_id'];
    }
    TabsPage.prototype.openMyCard = function () {
        var modal = this.modalCtrl.create('MyCardDesignedPage', { id: localStorage['user_id'] });
        modal.present();
    };
    TabsPage.prototype.clearSearch = function () {
        this.events.publish('user:clearSearch');
    };
    TabsPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        var el = document.getElementById('tab-t0-0');
        if (el) {
            el.addEventListener('click', function (event) {
                _this.clearSearch();
            });
        }
    };
    TabsPage.prototype.logout = function () {
        localStorage.clear();
        this.storage.clear();
        var newRootNav = this.app.getRootNavById('n4');
        newRootNav.push("LoginPage");
    };
    TabsPage.prototype.logoutAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: this.translateService.instant("LOGOUT"),
            message: this.translateService.instant("LogoutMessage"),
            buttons: [
                {
                    text: this.translateService.instant("Cancel"),
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: this.translateService.instant("LOGOUT"),
                    handler: function () {
                        _this.logout();
                    }
                }
            ]
        });
        alert.present();
    };
    TabsPage.prototype.sharelinkAlert = function () {
        this.socialSharing.share('Business Card Link: ');
    };
    TabsPage.prototype.openScanPage = function () {
        this.nav.push("ScanPage");
    };
    TabsPage.prototype.uploadImage = function () {
        var _this = this;
        var options = {
            quality: 90,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            targetHeight: 500,
            targetWidth: 500
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.addFriendFromGallery();
        }, function (err) {
            console.log(err);
        });
    };
    TabsPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    };
    TabsPage.prototype.addFriendFromGallery = function () {
        var _this = this;
        var info = {
            image: this.base64Image
        };
        this.friendsProvider.addFriendFromGalleryBackend(info, 'api/auth/addFriendFromGallery').subscribe(function (res) {
            _this.http.get('http://api.qrserver.com/v1/read-qr-code/?fileurl=' + encodeURIComponent(SERVER_URL + 'img/users/' + res['photo'])).subscribe(function (data) {
                if (data["0"].symbol["0"].data == null) {
                    _this.presentToast(data["0"].symbol["0"].error);
                }
                else {
                    _this.friendId = data["0"].symbol["0"].data;
                    var info_1 = {
                        user1_id: localStorage['user_id'],
                        user2_id: _this.friendId
                    };
                    _this.friendsProvider.addFriend(info_1, 'api/auth/addFriend').subscribe(function () {
                        _this.presentToast(_this.translateService.instant('addFriendFromGalleryMsg'));
                    });
                }
            });
        });
    };
    TabsPage = __decorate([
        IonicPage(),
        Component({
            templateUrl: 'tabs.html'
        }),
        __metadata("design:paramtypes", [NavController, FriendsProvider, HttpClient, Camera, ToastController, TranslateService, AlertController, ShareLinkProvider, SocialSharing, Storage, App, ModalController, Events])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.js.map