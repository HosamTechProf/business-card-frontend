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
import { NavController, IonicPage, ToastController } from 'ionic-angular';
import { ContactProvider } from '../../providers/contact';
import { TranslateService } from '@ngx-translate/core';
var ContactPage = /** @class */ (function () {
    function ContactPage(toastCtrl, translateService, contactProvider, navCtrl) {
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.contactProvider = contactProvider;
        this.navCtrl = navCtrl;
    }
    ContactPage.prototype.sendMessage = function () {
        var _this = this;
        var info = {
            name: this.name,
            email: this.email,
            message: this.message
        };
        this.contactProvider.sendMessage(info, 'api/auth/sendcontactus').subscribe(function (res) {
            var toast = _this.toastCtrl.create({
                message: _this.translateService.instant("MessageSent"),
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
            _this.navCtrl.pop();
        });
    };
    ContactPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-contact',
            templateUrl: 'contact.html'
        }),
        __metadata("design:paramtypes", [ToastController, TranslateService, ContactProvider, NavController])
    ], ContactPage);
    return ContactPage;
}());
export { ContactPage };
//# sourceMappingURL=contact.js.map