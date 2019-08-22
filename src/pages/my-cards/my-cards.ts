import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FriendsProvider } from '../../providers/friendsProvider';
import { SERVER_URL } from '../../providers/serverUrl';

/**
 * Generated class for the MyCardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cards',
  templateUrl: 'my-cards.html',
})
export class MyCardsPage {
	friends:any;
  friendImage;
  constructor(public modalCtrl: ModalController, private friendsProvider: FriendsProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.friendsProvider.getFriends('api/auth/getFriends').subscribe((res)=>{
  		this.friends = res;
      console.log(this.friends.image)
      this.friendImage = SERVER_URL + 'img/users/';
  	})
  }
    openModal(id) {
    let profileModal = this.modalCtrl.create('FriendCardPage', {id : id});
    profileModal.onDidDismiss(data => {
     this.friends = data.friends;
   });
    profileModal.present();
  }
}
