import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FavouritesProvider } from '../../providers/favouritesProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { SMS } from '@ionic-native/sms';

@IonicPage()
@Component({
    selector: 'page-favourites',
    templateUrl: 'favourites.html',
})
export class FavouritesPage {
    myId;
    favourites;
    userImage;
    constructor(private sms: SMS, public modalCtrl: ModalController, private favouritesProvider: FavouritesProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.favouritesProvider.getFavourites('api/auth/getFavourites').subscribe((data) => {
            this.favourites = data;
            this.userImage = SERVER_URL + 'img/users/';
        })
    }

    openFriendCard(id) {
        let profileModal = this.modalCtrl.create('FriendCardPage', { id: id });
        profileModal.onDidDismiss(data => {
            this.favourites = data['favourites'];
        });
        profileModal.present();
    }
    sendSMS(mobile) {
        var options = {
            replaceLineBreaks: false,
            android: {
                intent: 'INTENT'
            }
        }
        this.sms.send(mobile, '', options);
    }
}
