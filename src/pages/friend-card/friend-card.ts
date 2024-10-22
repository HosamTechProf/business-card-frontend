import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FriendsProvider } from '../../providers/friendsProvider';
import { FavouritesProvider } from '../../providers/favouritesProvider';
import { SMS } from '@ionic-native/sms';
import { SERVER_URL } from '../../providers/serverUrl';

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
    socialLink;
    image;
    friendImage;
    loading = true;
    spinner:boolean = true;
    constructor(private sms: SMS, public view: ViewController, private favouritesProvider: FavouritesProvider, private friendsProvider: FriendsProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.id = this.navParams.get('id');
        let info = {
            id: this.id
        }
        this.friendsProvider.getFriendData('api/auth/getFriendData/' + this.id).subscribe((data) => {
            this.name = data['name']
            this.phone = data['phone']
            this.mobile = data['mobile']
            this.email = data['email']
            this.desc = data['desc']
            this.company = data['company']
            this.socialLink = data['socialLink']
            this.image = data['image']
            this.friendImage = SERVER_URL + 'img/users/';
            this.spinner = false;
        })

        this.favouritesProvider.isFavorited('api/auth/isfavorited/' + localStorage['user_id'] + '/' + this.id).subscribe((data) => {
            if (data == 0) {
                this.faved = false;
            }
            else {
                this.faved = true;
            }
        })
        this.friendsProvider.isFriend('api/auth/isfriend/' + localStorage['user_id'] + '/' + this.id).subscribe((data) => {
            this.loading = false;
            if (data['status'] == 'true') {
                this.followed = 'true';
            }else if (data['status'] == 'false'){
                this.followed = 'false';
            }else{
                this.followed = 'notFriends';
            }
        })
    }

    closeModal() {
        this.friendsProvider.getFriends('api/auth/getFriends').subscribe((friends) => {
            this.friends = friends;
            this.friendsProvider.getFriends('api/auth/getFavourites').subscribe((favourites) => {
                this.favourites = favourites;
                let data = { friends: this.friends, favourites: this.favourites }
                this.view.dismiss(data);
            })
        })
    }

    follow() {
        this.followed = 'false';
        let info = {
            user1_id: localStorage['user_id'],
            user2_id: this.id
        }
        this.friendsProvider.addFriend(info, 'api/auth/addFriend').subscribe()
    }
    unfollow() {
        this.followed = 'notFriends';
        let info = {
            user1_id: localStorage['user_id'],
            user2_id: this.id
        }
        this.friendsProvider.deleteFriend(info, 'api/auth/deleteFriend').subscribe()
    }
    favourite() {
        this.faved = true;
        let info = {
            user1_id: localStorage['user_id'],
            user2_id: this.id
        }
        this.favouritesProvider.addFavourite(info, 'api/auth/addFavourite').subscribe()
    }
    unfavourite() {
        this.faved = false;
        this.favouritesProvider.removeFavourite('api/auth/removefavourite/' + localStorage['user_id'] + '/' + this.id).subscribe()
    }
    sendSMS() {
        var options = {
            replaceLineBreaks: false,
            android: {
                intent: 'INTENT'
            }
        }
        this.sms.send(this.mobile, '', options);
    }
}
