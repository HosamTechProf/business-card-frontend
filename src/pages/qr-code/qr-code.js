var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FriendsProvider } from '../../providers/friendsProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { Camera } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';
var QrCodePage = /** @class */ (function () {
    function QrCodePage(toastCtrl, http, camera, friendsProvider, translateService, alertCtrl, photoLibrary, el, navParam, navCtrl, navParams, view) {
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.camera = camera;
        this.friendsProvider = friendsProvider;
        this.translateService = translateService;
        this.alertCtrl = alertCtrl;
        this.photoLibrary = photoLibrary;
        this.el = el;
        this.navParam = navParam;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.id = '';
        this.id = this.navParam.get('id').toString();
    }
    QrCodePage.prototype.ionViewDidLoad = function () {
    };
    QrCodePage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    QrCodePage.prototype.download = function () {
        var _this = this;
        var test = 'https://i.ibb.co/0C6XddC/Screenshot-2019-10-17-14-09-53-85.png';
        console.log(encodeURIComponent(test));
        var el = document.querySelector('qrcode');
        var url = el.children[1].getAttribute('src');
        this.photoLibrary.requestAuthorization({ read: true, write: true }).then(function () {
            _this.photoLibrary.saveImage(url, 'Business Card').then(function (res) {
                var alert = _this.alertCtrl.create({
                    title: _this.translateService.instant('PhotoSaved'),
                    buttons: [_this.translateService.instant('Ok')]
                });
                alert.present();
            }).catch(function (err) {
                console.log(err);
            });
        });
    };
    QrCodePage.prototype.uploadImage = function () {
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
    QrCodePage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    };
    QrCodePage.prototype.addFriendFromGallery = function () {
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
    __decorate([
        ViewChild('qrcode'),
        __metadata("design:type", ElementRef)
    ], QrCodePage.prototype, "qrcode", void 0);
    QrCodePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-qr-code',
            templateUrl: 'qr-code.html',
        }),
        __metadata("design:paramtypes", [ToastController, HttpClient, Camera, FriendsProvider, TranslateService, AlertController, PhotoLibrary, ElementRef, NavParams, NavController, NavParams, ViewController])
    ], QrCodePage);
    return QrCodePage;
}());
export { QrCodePage };
//# sourceMappingURL=qr-code.js.map