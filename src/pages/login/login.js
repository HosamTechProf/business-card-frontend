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
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
var LoginPage = /** @class */ (function () {
    function LoginPage(http, translateService, loadingCtrl, toastCtrl, storage, authProvider, navCtrl, navParams) {
        var _this = this;
        this.http = http;
        this.translateService = translateService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.authProvider = authProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = false;
        this.authProvider.getCountries('api/auth/getcodes').subscribe(function (res) {
            _this.countries = res;
        });
    }
    LoginPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    LoginPage.prototype.openRegister = function () {
        this.navCtrl.push("RegisterPage");
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loading = true;
        if (this.mobile != null && this.password != null) {
            var info = {
                mobile: this.mobile,
                password: this.password,
                countryCode: this.countryCode
            };
            this.authProvider.registerData(info, 'api/auth/login').subscribe(function (data) {
                _this.loading = false;
                if (data['message'] === 'Authorized') {
                    _this.storage.set('my_token', data['access_token']);
                    _this.navCtrl.setRoot("TabsPage");
                    _this.presentToast(_this.translateService.instant("LoginSuccess"));
                }
                else if (data['message'] === 'Unauthorized') {
                    _this.presentToast(_this.translateService.instant("EmailPasswordError"));
                }
                else if (data['message'] === 'Active Account') {
                    _this.presentToast('برجاء تفعيل هذا الحساب');
                    var information = {
                        code: data['code'],
                        mobile: data['mobile']
                    };
                    _this.authProvider.sendCode(information, 'api/auth/sendcode').subscribe(function (res) {
                        _this.navCtrl.push('ActivationPage', { mobileNumber: data['mobile'], token: data['access_token'] });
                    });
                }
            }, function (err) {
                _this.loading = false;
                _this.presentToast("خطأ في رقم الجوال او كلمة المرور");
            });
        }
        else {
            this.presentToast(this.translateService.instant("EmailPasswordError"));
        }
    };
    LoginPage.prototype.getCountryCode = function (code) {
        this.countryCode = code;
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [HttpClient, TranslateService, LoadingController, ToastController, Storage, AuthProvider, NavController, NavParams])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map