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
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ChooseLanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChooseLanguagePage = /** @class */ (function () {
    function ChooseLanguagePage(view, storage, navCtrl, navParams) {
        this.view = view;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ChooseLanguagePage.prototype.chooseLanguage = function (lang) {
        this.storage.set('language', lang);
        var data = lang;
        this.view.dismiss(data);
    };
    ChooseLanguagePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-choose-language',
            templateUrl: 'choose-language.html',
        }),
        __metadata("design:paramtypes", [ViewController, Storage, NavController, NavParams])
    ], ChooseLanguagePage);
    return ChooseLanguagePage;
}());
export { ChooseLanguagePage };
//# sourceMappingURL=choose-language.js.map