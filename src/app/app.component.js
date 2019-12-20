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
import { Platform, ModalController, Nav, Events, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";
import { Deeplinks } from '@ionic-native/deeplinks';
import { ShareLinkProvider } from '../providers/shareLink';
import { NotificationProvider } from '../providers/notification';
import { AuthProvider } from '../providers/authProvider';
import { Push } from '@ionic-native/push';
import { TranslateService } from '@ngx-translate/core';
var MyApp = /** @class */ (function () {
    function MyApp(app, alertCtrl, authProvider, translateService, events, notificationProvider, push, shareLinkProvider, modalCtrl, deeplinks, cache, storage, platform, statusBar, splashScreen) {
        var _this = this;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        this.translateService = translateService;
        this.events = events;
        this.notificationProvider = notificationProvider;
        this.push = push;
        this.shareLinkProvider = shareLinkProvider;
        this.modalCtrl = modalCtrl;
        this.deeplinks = deeplinks;
        this.cache = cache;
        this.storage = storage;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.platform.ready().then(function () {
            _this.cache.setDefaultTTL(60 * 60 * 12);
            _this.cache.setOfflineInvalidate(false);
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
            _this.choseLanguage();
            _this.deepLinking();
            _this.notification();
            _this.events.subscribe('user:notification', function (eventData) {
                _this.notification();
            });
            _this.authProvider.getUserData('api/auth/user').subscribe(function (res) {
            }, function (err) {
                if (err.error.error === "Unauthenticated.") {
                    localStorage.clear();
                    _this.storage.clear();
                    var newRootNav = _this.app.getRootNavById('n4');
                    newRootNav.push("LoginPage");
                }
            });
        });
    }
    MyApp.prototype.choseLanguage = function () {
        var _this = this;
        this.storage.get('language').then(function (val) {
            if (val) {
                _this.initRootPage();
                _this.translateService.use(val);
                if (val == 'en') {
                    _this.platform.setDir('ltr', true);
                }
                else {
                    _this.platform.setDir('rtl', true);
                }
            }
            else {
                var languageModal = _this.modalCtrl.create('ChooseLanguagePage');
                languageModal.onDidDismiss(function (data) {
                    _this.translateService.use(data);
                    if (data == 'en') {
                        _this.platform.setDir('ltr', true);
                    }
                    else {
                        _this.platform.setDir('rtl', true);
                    }
                    _this.initRootPage();
                });
                languageModal.present();
            }
        });
    };
    MyApp.prototype.initRootPage = function () {
        var _this = this;
        this.storage.get('my_token').then(function (val) {
            _this.rootPage = val ? 'TabsPage' : 'LoginPage';
        });
    };
    MyApp.prototype.deepLinking = function () {
        var _this = this;
        this.deeplinks.route({
            '/user/:id/:token': 'user',
        }).subscribe(function (match) {
            if (match.$route === 'user') {
                // do whatever you want, you can navigate to profile page and send the id as a parameter
                var info = {
                    'token': match.$args.token,
                    'user_id': match.$args.id,
                    'user2_id': localStorage['user_id']
                };
                _this.shareLinkProvider.updateShare('api/auth/updateshare', info).subscribe(function (res) {
                    if (res['status'] == 'false1') {
                        var modal = _this.modalCtrl.create('MyCardDesignedPage', { id: localStorage['user_id'] });
                        modal.present();
                    }
                    else if (res['status'] == 'false2') {
                        alert(res['msg']);
                    }
                    else if (res['status'] == true) {
                        var profileModal = _this.modalCtrl.create('FriendCardPage', { id: match.$args.id });
                        profileModal.present();
                    }
                });
            }
        }, function (nomatch) {
            console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
        });
    };
    MyApp.prototype.notification = function () {
        var _this = this;
        var options = {
            android: {},
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            return console.log('Received a notification', notification);
        });
        pushObject.on('registration').subscribe(function (registration) {
            var info = {
                'deviceToken': registration['registrationId']
            };
            _this.notificationProvider.addDeviceToken('api/auth/adddevicetoken', info).subscribe();
        });
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [App, AlertController, AuthProvider, TranslateService, Events, NotificationProvider, Push, ShareLinkProvider, ModalController, Deeplinks, CacheService, Storage, Platform, StatusBar, SplashScreen])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map