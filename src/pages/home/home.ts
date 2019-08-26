import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, ModalController, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FriendsProvider } from '../../providers/friendsProvider';
import { FavouritesProvider } from '../../providers/favouritesProvider';
import { AdvertisementProvider } from '../../providers/advertisementProvider';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Searchbar } from 'ionic-angular';
import { SERVER_URL } from '../../providers/serverUrl';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('searchbar') searchbar:Searchbar;
  myId:Observable<any>;
  friendId;
  name;
  searchData;
  favourites;
  userImage;
  ads:Array<object>;
  randAd;
  adImage;
  adPhoto;
  adLink;
  adName;
  adsCount;
  adsStatus;
  constructor(private advertisementProvider: AdvertisementProvider, private storage: Storage, private app:App, private favouritesProvider: FavouritesProvider, private friendsProvider: FriendsProvider, private barcodeScanner: BarcodeScanner, private authProvider: AuthProvider, public navCtrl: NavController, public modalCtrl: ModalController) {
      this.authProvider.getUserData('api/auth/user').subscribe((res:Observable<any>)=>{
        this.myId = res['id'];
        localStorage['user_id'] = res['id'];
      });
      this.ionViewDidEnter();
      this.advertisementProvider.getAdvertisementsCount('api/auth/getadscount').subscribe((data)=>{
        this.adsCount = data;
      })
      if (this.adsCount > 0) {
        this.adsStatus = true;
      }
      else{
        this.adsStatus = false;
      }
  }
  ionViewDidEnter(){
      this.advertisementProvider.getAdvertisements('api/auth/getads').subscribe((data:Array<object>)=>{
        this.ads = data;
        this.randAd = this.ads[Math.floor(Math.random()*this.ads.length)]
        this.adImage = SERVER_URL.substring(0, SERVER_URL.length - 1);
        this.adPhoto = this.randAd['photo'];
        this.adLink = this.randAd['link'];
        this.adName = this.randAd['name'];
      })
      this.favouritesProvider.getFavourites('api/auth/getFavourites').subscribe((data)=>{
        this.favourites = data;
        this.userImage = SERVER_URL + 'img/users/';
      })
      this.name = null;
  }

  openModal() {
    let profileModal = this.modalCtrl.create('QrCodePage', {id : this.myId});
    profileModal.present();
  }

  openFriendCard(id) {
    let profileModal = this.modalCtrl.create('FriendCardPage', {id : id});
    profileModal.onDidDismiss(data => {
     this.favourites = data['favourites'];
   });
    profileModal.present();
  }

  addFriend(){
    this.barcodeScanner.scan().then(barcodeData => {
     let info = {
       'user1_id' : this.myId,
       'user2_id' : barcodeData.text
     }
     this.friendsProvider.addFriend(info, 'api/auth/addFriendQr').subscribe((data)=>{
        if (data['status']) {
          let friendCard = this.modalCtrl.create('FriendCardPage', {id : barcodeData.text});
          friendCard.present();
        }
      },(err)=>{
        // this.presentToast(Object.keys(JSON.parse(err._body).error).map(key => JSON.parse(err._body).error[key])['0']);
      })
    }).catch(err => {
        console.log('Error', err);
    });
  }

  logout(){
    localStorage.clear();
    this.storage.clear();
    this.app.getRootNav().setRoot("LoginPage");
  }
  openMyCards(){
    this.navCtrl.push("MyCardsPage");
  }
  search(){
    let info = {
      name : this.name
    }

    this.authProvider.search(info, 'api/auth/search').subscribe((data)=>{
      this.searchData = data;
    })
  }
  openUserCard(id) {
    let profileModal = this.modalCtrl.create('FriendCardPage', {id : id});
    profileModal.onDidDismiss(data => {
     this.favourites = data['favourites'];
      setTimeout(() => {
        this.searchbar.setFocus();
   });
    });
    profileModal.present();
  }
  openFavourites(){
    this.navCtrl.push("FavouritesPage");
  }
}
