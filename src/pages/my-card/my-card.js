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
import { IonicPage, NavController, NavParams, AlertController, ToastController, App, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
var MyCardPage = /** @class */ (function () {
    function MyCardPage(translateService, modalCtrl, storage, app, toastCtrl, camera, alertCtrl, authProvider, navCtrl, navParams) {
        var _this = this;
        this.translateService = translateService;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.app = app;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.id = '';
        this.name = '';
        this.email = '';
        this.password = '';
        this.phone = '';
        this.mobile = '';
        this.company = '';
        this.desc = '';
        this.socialLink = '';
        this.userDataArray = {};
        this.base64Image = '';
        this.authProvider.getUserData('api/auth/user').subscribe(function (res) {
            _this.id = res['id'];
            _this.name = res['name'];
            _this.email = res['email'];
            _this.password = res['password'];
            _this.phone = res['phone'];
            _this.company = res['company'];
            _this.desc = res['desc'];
            _this.mobile = res['mobile'];
            _this.isPublic = res['isPublic'];
            _this.socialLink = res['socialLink'];
            _this.userImage = SERVER_URL + 'img/users/' + res['image'];
        });
        this.edittable = true;
    }
    MyCardPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
        });
        toast.present();
    };
    MyCardPage.prototype.uploadImage = function () {
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
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.userImage = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            console.log(err);
        });
    };
    MyCardPage.prototype.edit = function () {
        this.edittable = true;
    };
    MyCardPage.prototype.update = function () {
        var _this = this;
        this.edittable = false;
        var info = {
            email: this.email,
            password: this.password,
            mobile: this.mobile,
            name: this.name,
            company: this.company,
            desc: this.desc,
            phone: this.phone,
            socialLink: this.socialLink,
            isPublic: this.isPublic,
            image: this.base64Image
        };
        this.authProvider.updateUserData(info, 'api/auth/updateUser').subscribe(function (res) {
            _this.userImage = SERVER_URL + 'img/users/' + res['image'];
            _this.presentToast(_this.translateService.instant("CardEdditedSuc"));
        });
    };
    MyCardPage.prototype.logout = function () {
        localStorage.clear();
        this.storage.clear();
        // this.app.getRootNav().setRoot("LoginPage");
        var newRootNav = this.app.getRootNavById('n4');
        newRootNav.push("LoginPage");
    };
    MyCardPage.prototype.back = function () {
        this.navCtrl.setRoot("TabsPage");
    };
    MyCardPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-my-card',
            templateUrl: 'my-card.html',
        }),
        __metadata("design:paramtypes", [TranslateService, ModalController, Storage, App, ToastController, Camera, AlertController, AuthProvider, NavController, NavParams])
    ], MyCardPage);
    return MyCardPage;
}());
export { MyCardPage };
//# sourceMappingURL=my-card.js.map