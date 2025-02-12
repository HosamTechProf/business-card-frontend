import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, ModalController, App, Platform, Events, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { FriendsProvider } from '../../providers/friendsProvider';
import { FavouritesProvider } from '../../providers/favouritesProvider';
import { ShareLinkProvider } from '../../providers/shareLink';
import { AdvertisementProvider } from '../../providers/advertisementProvider';
import { ContactProvider } from '../../providers/contact';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Searchbar } from 'ionic-angular';
import { SERVER_URL } from '../../providers/serverUrl';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('searchbar') searchbar: Searchbar;
    myId: Observable<any>;
    friendId;
    name;
    searchData;
    favourites;
    userImage;
    ads: Array<object>;
    randAd;
    adImage;
    adPhoto;
    adLink;
    adName;
    adsCount;
    token;
    myContactsUsers;
    myContacts:any[] = [];
    public adsStatus;
    spinner;
    searchSpinner;
    followRequestsCount;
    followRequestsCountVisible;
    searchType = 'name';
    constructor(public loadingCtrl: LoadingController, public translateService: TranslateService, private contactProvider: ContactProvider, private contacts: Contacts, public events: Events, private shareLinkProvider: ShareLinkProvider, private socialSharing: SocialSharing, public platform: Platform, private advertisementProvider: AdvertisementProvider, private storage: Storage, private app: App, private favouritesProvider: FavouritesProvider, private friendsProvider: FriendsProvider, private authProvider: AuthProvider, public navCtrl: NavController, public modalCtrl: ModalController) {
        this.spinner = true;
        this.searchSpinner = true;
        this.authProvider.getUserData('api/auth/user').subscribe((res: Observable<any>) => {
            this.myId = res['id'];
            localStorage['user_id'] = res['id'];
        });
        this.ionViewDidEnter();
        this.platform.registerBackButtonAction(() => {});
        this.events.subscribe('user:clearSearch', eventData => {
          this.clearSearch();
        });
        if (this.platform.is('cordova')) {
            this.contacts.find(['displayName', 'phoneNumbers'], {filter: "", multiple: true})
            .then(contacts => {
                for (var i=0 ; i < contacts.length; i++){
                    if (contacts[i].phoneNumbers != null) {
                       var obj = {};
                       obj["name"] = contacts[i].displayName;
                       if (contacts[i].phoneNumbers[1]) {
                           let numbers = [contacts[i].phoneNumbers[0].value,contacts[i].phoneNumbers[1].value]
                           obj["number"] = numbers;
                       }
                       else{
                           let numbers = [contacts[i].phoneNumbers[0].value,'null']
                           obj["number"] = numbers;
                       }
                       this.myContacts.push(obj)
                    }
                }
                   let info = {
                       contacts : this.myContacts,
                       length : this.myContacts.length,
                   }
                   this.contactProvider.getContactsFromDatabase(info, 'api/auth/getcontacts').subscribe((res)=>{
                       this.myContactsUsers = res
                       this.spinner = false;
                   })
            });
        }else{
            this.myContactsUsers = [];
            this.spinner = false
        }

    }
    ionViewDidEnter() {
        this.friendsProvider.getFollowRequestsCount('api/auth/getfollowrequestscount').subscribe((res)=>{
            this.followRequestsCount = res;
            if (res == 0) {
                this.followRequestsCountVisible = false;
            }else{
                this.followRequestsCountVisible = true;
            }
        })
        this.advertisementProvider.getAdvertisementsCount('api/auth/getadscount').subscribe((data) => {
            this.adsCount = data;
            if (this.adsCount > 0) {
                this.adsStatus = true;
            }
            else {
                this.adsStatus = false;
            }
            if (this.adsStatus == true) {
                this.advertisementProvider.getAdvertisements('api/auth/getads').subscribe((data: Array<object>) => {
                    this.ads = data;
                    this.randAd = this.ads[Math.floor(Math.random() * this.ads.length)]
                    this.adImage = SERVER_URL.substring(0, SERVER_URL.length - 1);
                    this.adPhoto = this.randAd['photo'];
                    this.adLink = this.randAd['link'];
                    this.adName = this.randAd['name'];
                })
            }
        })
        this.favouritesProvider.getFavourites('api/auth/getFavourites').subscribe((data) => {
            this.favourites = data;
            this.userImage = SERVER_URL + 'img/users/';
        })
        this.name = null;
    }

    openQrPage() {
        let navCtrl: NavController = this.app.getRootNav();
        navCtrl.push("ScanPage");

        // this.navCtrl.push("ScanPage")
    }

    openFriendCard(id) {
        let profileModal = this.modalCtrl.create('FriendCardPage', { id: id });
        profileModal.onDidDismiss(data => {
            this.favourites = data['favourites'];
        });
        profileModal.present();
    }

    openMyCards() {
        this.navCtrl.push("MyCardsPage");
    }

    search() {
        let info = {
            name: this.name,
            type: this.searchType
        }
        this.authProvider.search(info, 'api/auth/search').subscribe((data) => {
            this.searchSpinner = false;
            this.searchData = data;
        })
    }
    openUserCard(id) {
        let profileModal = this.modalCtrl.create('FriendCardPage', { id: id });
        profileModal.onDidDismiss(data => {
            this.favourites = data['favourites'];
        });
        profileModal.present();
    }
    openFavourites() {
        this.navCtrl.push("FavouritesPage");
    }

    shareLink(message='My Business Card Link: ', subject=null, file=null){
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        const lengthOfCode = 15;
        this.token = this.makeRandom(lengthOfCode, possible);
        let info = {
            'user_id' : this.myId,
            'token' : this.token
        }
        this.shareLinkProvider.share('api/auth/share', info).subscribe((res)=>{
            this.socialSharing.share(message, subject, file, SERVER_URL + 'user/' + this.myId + '/' + res['token'])
        })
    }

    makeRandom(lengthOfCode: number, possible: string) {
      let text = "";
      for (let i = 0; i < lengthOfCode; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
        return text;
    }
    generateToken(){
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        const lengthOfCode = 15;
        this.token = this.makeRandom(lengthOfCode, possible);
        console.log(this.token)
    }
    clearSearch(){
        this.name = null;
    }

    followRequests(){
        this.navCtrl.push("FollowRequestsPage");
    }

    changeSearchType(type){
        this.searchType = type;
        let info = {
            name: this.name,
            type: type
        }
        this.authProvider.search(info, 'api/auth/search').subscribe((data) => {
            this.searchData = data;
        })
    }

    openSettings(){
        this.navCtrl.push("SettingsPage");
    }
}
