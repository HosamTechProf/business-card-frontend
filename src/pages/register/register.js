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
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { SERVER_URL } from '../../providers/serverUrl';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(http, translateService, events, camera, toastCtrl, storage, navCtrl, navParams, authProvider) {
        var _this = this;
        this.http = http;
        this.translateService = translateService;
        this.events = events;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.name = '';
        this.password = '';
        this.c_password = '';
        this.mobile = '';
        this.base64Image = '';
        this.isPublic = true;
        this.userImage = SERVER_URL + 'img/users/user.svg';
        this.loading = false;
        this.authProvider.getCountries('api/auth/getcodes').subscribe(function (res) {
            _this.countries = res;
        });
    }
    RegisterPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
        });
        toast.present();
    };
    RegisterPage.prototype.uploadImage = function () {
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
    RegisterPage.prototype.register = function () {
        var _this = this;
        if (this.name == "") {
            this.presentToast(this.translateService.instant("NameError"));
        }
        else if (this.mobile == "") {
            this.presentToast(this.translateService.instant("MobileError"));
        }
        else if (this.password == "") {
            this.presentToast(this.translateService.instant("PASSWORDERROR"));
        }
        else if (this.c_password == "") {
            this.presentToast(this.translateService.instant("RePasswordError"));
        }
        else if (this.password != this.c_password) {
            this.presentToast(this.translateService.instant("RePasswordError"));
        }
        else {
            this.loading = true;
            var info = {
                password: this.password,
                c_password: this.c_password,
                mobile: this.mobile,
                name: this.name,
                image: this.base64Image,
                isPublic: this.isPublic,
                countryCode: this.countryCode
            };
            this.authProvider.registerData(info, 'api/auth/register').subscribe(function (data) {
                if (data['status']) {
                    var information = {
                        code: data['code'],
                        mobile: data['mobile']
                    };
                    _this.authProvider.sendCode(information, 'api/auth/sendcode').subscribe(function (res) {
                        _this.loading = false;
                        console.log(res);
                        _this.navCtrl.push("ActivationPage", { mobileNumber: data['mobile'], 'token': data['success'].token });
                        _this.presentToast(data['msg']);
                        _this.events.publish('user:notification');
                    });
                }
            }, function (err) {
                _this.loading = false;
                console.log(err['error']['error']);
                _this.presentToast(Object.keys(err['error'].error).map(function (key) { return err['error'].error[key]; })['0']);
            });
        }
    };
    RegisterPage.prototype.getCountryCode = function (code) {
        this.countryCode = code;
    };
    RegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-register',
            templateUrl: 'register.html',
        }),
        __metadata("design:paramtypes", [HttpClient, TranslateService, Events, Camera, ToastController, Storage, NavController, NavParams, AuthProvider])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map