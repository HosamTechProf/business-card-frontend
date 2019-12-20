var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Platform, ToastController, Slides, ModalController, AlertController } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';
import { trigger, style, animate, transition } from '@angular/animations';
import { FriendsProvider } from '../../providers/friendsProvider';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ShareLinkProvider } from '../../providers/shareLink';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SERVER_URL } from '../../providers/serverUrl';
import { Camera } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
var ScanPage = /** @class */ (function () {
    function ScanPage(http, platform, translateService, camera, shareLinkProvider, socialSharing, photoLibrary, alertCtrl, modalCtrl, friendsProvider, toastCtrl, qrScanner, navCtrl) {
        var _this = this;
        this.http = http;
        this.platform = platform;
        this.translateService = translateService;
        this.camera = camera;
        this.shareLinkProvider = shareLinkProvider;
        this.socialSharing = socialSharing;
        this.photoLibrary = photoLibrary;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.friendsProvider = friendsProvider;
        this.toastCtrl = toastCtrl;
        this.qrScanner = qrScanner;
        this.navCtrl = navCtrl;
        this.button = "Scan";
        this.myId = localStorage['user_id'];
        this.platform.registerBackButtonAction(function () {
            _this.navCtrl.pop();
        });
    }
    ScanPage.prototype.ionViewWillEnter = function () {
        this.scan();
    };
    ScanPage.prototype.ionViewWillLeave = function () {
        this.stopScanning();
    };
    ScanPage.prototype.scan = function () {
        var _this = this;
        window.document.querySelector('ion-app').classList.add('cameraView');
        this.qrScanner.prepare()
            .then(function (status) {
            if (status.authorized) {
                _this.qrScanner.show();
                _this.scanSubscription = _this.qrScanner.scan().subscribe(function (text) {
                    var info = {
                        'user1_id': localStorage['user_id'],
                        'user2_id': text
                    };
                    _this.friendsProvider.addFriend(info, 'api/auth/addFriendQr').subscribe(function (data) {
                        if (data['status']) {
                            _this.navCtrl.pop();
                            var friendCard = _this.modalCtrl.create('FriendCardPage', { id: text });
                            friendCard.present();
                        }
                    }, function (err) {
                        _this.presentToast("خطأ برجاء المسح مرة أخري");
                    });
                });
            }
            else {
                console.error('Permission Denied', status);
            }
        })
            .catch(function (e) {
            console.error('Error', e);
        });
    };
    ScanPage.prototype.stopScanning = function () {
        (this.scanSubscription) ? this.scanSubscription.unsubscribe() : null;
        this.scanSubscription = null;
        window.document.querySelector('ion-app').classList.remove('cameraView');
        this.qrScanner.hide();
        this.qrScanner.destroy();
    };
    ScanPage.prototype.goToScan = function () {
        this.slides.slideTo(1, 500);
        this.button = "QR";
    };
    ScanPage.prototype.goToQR = function () {
        this.slides.slideTo(0, 500);
        this.button = "Scan";
    };
    ScanPage.prototype.slideChanged = function () {
        var currentIndex = this.slides.getActiveIndex();
        if (currentIndex == 0) {
            this.button = "Scan";
        }
        else {
            this.button = "QR";
        }
    };
    ScanPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    ScanPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    ScanPage.prototype.share = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'أختار الطريقة',
            buttons: [
                {
                    text: 'حفظ الي الصور',
                    handler: function () {
                        var ul = document.getElementById("myImg");
                        var url = ul.src;
                        console.log(url);
                        _this.photoLibrary.requestAuthorization({ read: true, write: true }).then(function () {
                            _this.photoLibrary.saveImage(url, 'Business Card').then(function (res) {
                                var alert = _this.alertCtrl.create({
                                    title: 'تم حفظ الصورة',
                                    buttons: ['OK']
                                });
                                alert.present();
                            }).catch(function (err) {
                                console.log(err);
                            });
                        });
                    }
                },
                {
                    text: 'مشاركة رابط',
                    handler: function () {
                        _this.shareLink();
                    }
                }
            ]
        });
        alert.present();
    };
    ScanPage.prototype.shareLink = function (message, subject, file) {
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
    ScanPage.prototype.makeRandom = function (lengthOfCode, possible) {
        var text = "";
        for (var i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    ScanPage.prototype.generateToken = function () {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var lengthOfCode = 15;
        this.token = this.makeRandom(lengthOfCode, possible);
        console.log(this.token);
    };
    ScanPage.prototype.uploadImage = function () {
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
    ScanPage.prototype.addFriendFromGallery = function () {
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
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], ScanPage.prototype, "slides", void 0);
    ScanPage = __decorate([
        IonicPage(),
        Component({
            animations: [
                trigger('myAnimation', [
                    transition(':enter', [style({ transform: 'rotate(180deg)', opacity: 0 }),
                        animate('500ms ease-in', style({ transform: 'rotate(0)', 'opacity': 1 }))]),
                    transition(':leave', [style({ transform: 'rotate(0)', 'opacity': 1 }),
                        animate('500ms ease-out', style({ transform: 'rotate(180deg)', 'opacity': 0 }))])
                ])
            ],
            selector: 'page-scan',
            templateUrl: 'scan.html'
        }),
        __metadata("design:paramtypes", [HttpClient, Platform, TranslateService, Camera, ShareLinkProvider, SocialSharing, PhotoLibrary, AlertController, ModalController, FriendsProvider, ToastController, QRScanner, NavController])
    ], ScanPage);
    return ScanPage;
}());
export { ScanPage };
//# sourceMappingURL=scan.js.map