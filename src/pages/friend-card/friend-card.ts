import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FriendsProvider } from '../../providers/friendsProvider';
import { FavouritesProvider } from '../../providers/favouritesProvider';
import { SMS } from '@ionic-native/sms';

/**
 * Generated class for the FriendCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-card',
  templateUrl: 'friend-card.html',
})
export class FriendCardPage {
	id;
	name;
	phone;
	mobile;
	email;
	desc;
	company;
  followed;
  faved;
  friends;
  favourites;
  constructor(private sms: SMS, public view: ViewController, private favouritesProvider: FavouritesProvider, private friendsProvider: FriendsProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get('id');
    let info = {
    	id: this.id
    }
    this.friendsProvider.getFriendData(info, 'api/auth/getFriendData').subscribe((data)=>{
    	this.name = data['name']
    	this.phone = data['phone']
    	this.mobile = data['mobile']
    	this.email = data['email']
    	this.desc = data['desc']
    	this.company = data['company']
    })

    this.favouritesProvider.isFavorited('api/auth/isfavorited/' + localStorage['user_id'] + '/' + this.id).subscribe((data)=>{
        if(data == 0){
          this.faved = false;
        }
        else{
          this.faved = true;
        }
    })
    this.friendsProvider.isFriend('api/auth/isfriend/' + localStorage['user_id'] + '/' + this.id).subscribe((data)=>{
      if (data != 0) {
        this.followed = true;
      }
    })
  }

  closeModal() {
    this.friendsProvider.getFriends('api/auth/getFriends').subscribe((friends)=>{
      this.friends = friends;
    this.friendsProvider.getFriends('api/auth/getFavourites').subscribe((favourites)=>{
      this.favourites = favourites;
    let data = {friends : this.friends, favourites : this.favourites}
   this.view.dismiss(data);
    })
    })
   // let data = { 'foo': 'bar' };
  }
  follow(){
    this.followed = true;
    let info = {
      user1_id: localStorage['user_id'],
      user2_id: this.id
    }
    this.friendsProvider.addFriend(info, 'api/auth/addFriend').subscribe()
  }
  unfollow(){
    this.followed = false;
    let info = {
      user1_id: localStorage['user_id'],
      user2_id: this.id
    }
    this.friendsProvider.deleteFriend(info, 'api/auth/deleteFriend').subscribe()
  }
  favourite(){
    this.faved = true;
    let info = {
      user1_id: localStorage['user_id'],
      user2_id: this.id
    }
    this.favouritesProvider.addFavourite(info, 'api/auth/addFavourite').subscribe()
  }
  unfavourite(){
    this.faved = false;
    this.favouritesProvider.removeFavourite('api/auth/removefavourite/' + localStorage['user_id'] + '/' + this.id).subscribe()
  }
sendSMS(){
          var options = {
            replaceLineBreaks: false,
            android: {
              intent: 'INTENT'
            }
        }
        this.sms.send(this.mobile, '', options);
      }
}
