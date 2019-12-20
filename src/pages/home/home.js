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
import { NavController, IonicPage, ModalController, App, Platform, Events, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { FriendsProvider } from '../../providers/friendsProvider';
import { FavouritesProvider } from '../../providers/favouritesProvider';
import { ShareLinkProvider } from '../../providers/shareLink';
import { AdvertisementProvider } from '../../providers/advertisementProvider';
import { ContactProvider } from '../../providers/contact';
import { Storage } from '@ionic/storage';
import { Searchbar } from 'ionic-angular';
import { SERVER_URL } from '../../providers/serverUrl';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Contacts } from '@ionic-native/contacts';
import { TranslateService } from '@ngx-translate/core';
var HomePage = /** @class */ (function () {
    function HomePage(loadingCtrl, translateService, contactProvider, contacts, events, shareLinkProvider, socialSharing, platform, advertisementProvider, storage, app, favouritesProvider, friendsProvider, authProvider, navCtrl, modalCtrl) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.translateService = translateService;
        this.contactProvider = contactProvider;
        this.contacts = contacts;
        this.events = events;
        this.shareLinkProvider = shareLinkProvider;
        this.socialSharing = socialSharing;
        this.platform = platform;
        this.advertisementProvider = advertisementProvider;
        this.storage = storage;
        this.app = app;
        this.favouritesProvider = favouritesProvider;
        this.friendsProvider = friendsProvider;
        this.authProvider = authProvider;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.myContacts = [];
        this.searchType = 'name';
        this.spinner = true;
        this.searchSpinner = true;
        this.authProvider.getUserData('api/auth/user').subscribe(function (res) {
            _this.myId = res['id'];
            localStorage['user_id'] = res['id'];
        });
        this.ionViewDidEnter();
        this.platform.registerBackButtonAction(function () { });
        this.events.subscribe('user:clearSearch', function (eventData) {
            _this.clearSearch();
        });
        if (this.platform.is('cordova')) {
            this.contacts.find(['displayName', 'phoneNumbers'], { filter: "", multiple: true })
                .then(function (contacts) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].phoneNumbers != null) {
                        var obj = {};
                        obj["name"] = contacts[i].displayName;
                        if (contacts[i].phoneNumbers[1]) {
                            var numbers = [contacts[i].phoneNumbers[0].value, contacts[i].phoneNumbers[1].value];
                            obj["number"] = numbers;
                        }
                        else {
                            var numbers = [contacts[i].phoneNumbers[0].value, 'null'];
                            obj["number"] = numbers;
                        }
                        _this.myContacts.push(obj);
                    }
                }
                var info = {
                    contacts: _this.myContacts,
                    length: _this.myContacts.length,
                };
                _this.contactProvider.getContactsFromDatabase(info, 'api/auth/getcontacts').subscribe(function (res) {
                    _this.myContactsUsers = res;
                    _this.spinner = false;
                });
            });
        }
        else {
            this.myContactsUsers = [];
            this.spinner = false;
        }
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.friendsProvider.getFollowRequestsCount('api/auth/getfollowrequestscount').subscribe(function (res) {
            _this.followRequestsCount = res;
            if (res == 0) {
                _this.followRequestsCountVisible = false;
            }
            else {
                _this.followRequestsCountVisible = true;
            }
        });
        this.advertisementProvider.getAdvertisementsCount('api/auth/getadscount').subscribe(function (data) {
            _this.adsCount = data;
            if (_this.adsCount > 0) {
                _this.adsStatus = true;
            }
            else {
                _this.adsStatus = false;
            }
            if (_this.adsStatus == true) {
                _this.advertisementProvider.getAdvertisements('api/auth/getads').subscribe(function (data) {
                    _this.ads = data;
                    _this.randAd = _this.ads[Math.floor(Math.random() * _this.ads.length)];
                    _this.adImage = SERVER_URL.substring(0, SERVER_URL.length - 1);
                    _this.adPhoto = _this.randAd['photo'];
                    _this.adLink = _this.randAd['link'];
                    _this.adName = _this.randAd['name'];
                });
            }
        });
        this.favouritesProvider.getFavourites('api/auth/getFavourites').subscribe(function (data) {
            _this.favourites = data;
            _this.userImage = SERVER_URL + 'img/users/';
        });
        this.name = null;
    };
    HomePage.prototype.openQrPage = function () {
        this.navCtrl.setRoot("ScanPage");
    };
    HomePage.prototype.openFriendCard = function (id) {
        var _this = this;
        var profileModal = this.modalCtrl.create('FriendCardPage', { id: id });
        profileModal.onDidDismiss(function (data) {
            _this.favourites = data['favourites'];
        });
        profileModal.present();
    };
    HomePage.prototype.openMyCards = function () {
        this.navCtrl.push("MyCardsPage");
    };
    HomePage.prototype.search = function () {
        var _this = this;
        var info = {
            name: this.name,
            type: this.searchType
        };
        this.authProvider.search(info, 'api/auth/search').subscribe(function (data) {
            _this.searchSpinner = false;
            _this.searchData = data;
        });
    };
    HomePage.prototype.openUserCard = function (id) {
        var _this = this;
        var profileModal = this.modalCtrl.create('FriendCardPage', { id: id });
        profileModal.onDidDismiss(function (data) {
            _this.favourites = data['favourites'];
        });
        profileModal.present();
    };
    HomePage.prototype.openFavourites = function () {
        this.navCtrl.push("FavouritesPage");
    };
    HomePage.prototype.shareLink = function (message, subject, file) {
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
    HomePage.prototype.makeRandom = function (lengthOfCode, possible) {
        var text = "";
        for (var i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    HomePage.prototype.generateToken = function () {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var lengthOfCode = 15;
        this.token = this.makeRandom(lengthOfCode, possible);
        console.log(this.token);
    };
    HomePage.prototype.clearSearch = function () {
        this.name = null;
    };
    HomePage.prototype.followRequests = function () {
        this.navCtrl.push("FollowRequestsPage");
    };
    HomePage.prototype.changeSearchType = function (type) {
        var _this = this;
        this.searchType = type;
        var info = {
            name: this.name,
            type: type
        };
        this.authProvider.search(info, 'api/auth/search').subscribe(function (data) {
            _this.searchData = data;
        });
    };
    HomePage.prototype.openSettings = function () {
        this.navCtrl.push("SettingsPage");
    };
    __decorate([
        ViewChild('searchbar'),
        __metadata("design:type", Searchbar)
    ], HomePage.prototype, "searchbar", void 0);
    HomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [LoadingController, TranslateService, ContactProvider, Contacts, Events, ShareLinkProvider, SocialSharing, Platform, AdvertisementProvider, Storage, App, FavouritesProvider, FriendsProvider, AuthProvider, NavController, ModalController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map