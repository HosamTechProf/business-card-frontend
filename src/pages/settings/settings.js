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
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(toastCtrl, storage, loadingCtrl, translateService, platform, actionSheetCtrl, navCtrl, navParams) {
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.translateService = translateService;
        this.platform = platform;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        if (this.platform.isRTL) {
            this.lang = "عربي";
        }
        else {
            this.lang = "English";
        }
    }
    SettingsPage.prototype.changeLanguage = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'عربي',
                    handler: function () {
                        var loading = _this.loadingCtrl.create({
                            content: _this.translateService.instant("PleaseWait")
                        });
                        loading.present();
                        setTimeout(function () {
                            loading.dismiss();
                        }, 1000);
                        _this.platform.setDir('rtl', true);
                        _this.translateService.use('ar');
                        _this.storage.set('language', 'ar');
                        _this.lang = "عربي";
                    }
                },
                {
                    text: 'English',
                    handler: function () {
                        var loading = _this.loadingCtrl.create({
                            content: _this.translateService.instant("PleaseWait")
                        });
                        loading.present();
                        setTimeout(function () {
                            loading.dismiss();
                        }, 1000);
                        _this.platform.setDir('ltr', true);
                        _this.translateService.use('en');
                        _this.storage.set('language', 'en');
                        _this.lang = "English";
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    SettingsPage.prototype.notification = function () {
        var toast = this.toastCtrl.create({
            message: this.translateService.instant("NotificationSetting"),
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    SettingsPage.prototype.openContact = function () {
        this.navCtrl.push("ContactPage");
    };
    SettingsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-settings',
            templateUrl: 'settings.html',
        }),
        __metadata("design:paramtypes", [ToastController, Storage, LoadingController, TranslateService, Platform, ActionSheetController, NavController, NavParams])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.js.map