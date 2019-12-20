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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ActivationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ActivationPage = /** @class */ (function () {
    function ActivationPage(storage, authProvider, navCtrl, navParams) {
        this.storage = storage;
        this.authProvider = authProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.code = [];
        this.loading = false;
        this.mobileNumber = this.navParams.get('mobileNumber');
        this.token = this.navParams.get('token');
    }
    ActivationPage.prototype.clearInput = function (index) {
        if (this.code[index] == null)
            return;
        if (this.code[index].toString().length == 1)
            this.code[index] = null;
    };
    ActivationPage.prototype.focusOnFrom = function (next, ci) {
        if (this.code[ci] == null)
            return;
        if (this.code[ci].toString().length < 1)
            return;
        if (isNaN(this.code[ci])) {
            this.code[ci] = null;
            return;
        }
        if (this.code[ci].toString().length == 1) {
            if (next.value)
                this.detectInput();
            else
                next.setFocus();
        }
        else if (this.code[ci].toString().length == 4) {
            this.code = this.code[ci].toString().split('');
            this.verify();
        }
        else {
            var codes = this.code[ci].toString().split('');
            for (var i = ci; i < codes.length; i++) {
                this.code[i] = codes[i];
            }
        }
    };
    ActivationPage.prototype.detectInput = function () {
        for (var i = 0; i < 4; i++) {
            if (!this.code[i]) {
                this["code" + i].setFocus();
                return;
            }
        }
    };
    ActivationPage.prototype.detectkey = function (pi, e) {
        if (e.keyCode == 8) {
            this.code[pi] = null;
            this["code" + pi].setFocus();
        }
    };
    ActivationPage.prototype.verify = function () {
        var _this = this;
        this.loading = true;
        var info = {
            code: this.code.join(''),
            mobile: this.mobileNumber
        };
        this.authProvider.verifyCode(info, 'api/auth/verifycode').subscribe(function (res) {
            _this.loading = false;
            if (res['status'] === true) {
                _this.navCtrl.setRoot("TabsPage");
                _this.storage.set('my_token', _this.token);
            }
            else {
                alert('الكود غير صحيح');
            }
        });
    };
    ActivationPage.prototype.validateCode = function () {
        return !(this.code.length == 4);
    };
    __decorate([
        ViewChild('code0'),
        __metadata("design:type", Object)
    ], ActivationPage.prototype, "code0", void 0);
    __decorate([
        ViewChild('code1'),
        __metadata("design:type", Object)
    ], ActivationPage.prototype, "code1", void 0);
    __decorate([
        ViewChild('code2'),
        __metadata("design:type", Object)
    ], ActivationPage.prototype, "code2", void 0);
    __decorate([
        ViewChild('code3'),
        __metadata("design:type", Object)
    ], ActivationPage.prototype, "code3", void 0);
    ActivationPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-activation',
            templateUrl: 'activation.html',
        }),
        __metadata("design:paramtypes", [Storage, AuthProvider, NavController, NavParams])
    ], ActivationPage);
    return ActivationPage;
}());
export { ActivationPage };
//# sourceMappingURL=activation.js.map