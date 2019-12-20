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
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { FriendsProvider } from '../../providers/friendsProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the ScanMethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScanMethodPage = /** @class */ (function () {
    function ScanMethodPage(friendsProvider, http, camera, toastCtrl, translateService, events, view, navCtrl, navParams) {
        this.friendsProvider = friendsProvider;
        this.http = http;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.events = events;
        this.view = view;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ScanMethodPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    ScanMethodPage.prototype.scan = function () {
        this.events.publish('user:scan');
    };
    ScanMethodPage.prototype.uploadImage = function () {
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
    ScanMethodPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    };
    ScanMethodPage.prototype.addFriendFromGallery = function () {
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
    ScanMethodPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-scan-method',
            templateUrl: 'scan-method.html',
        }),
        __metadata("design:paramtypes", [FriendsProvider, HttpClient, Camera, ToastController, TranslateService, Events, ViewController, NavController, NavParams])
    ], ScanMethodPage);
    return ScanMethodPage;
}());
export { ScanMethodPage };
//# sourceMappingURL=scan-method.js.map