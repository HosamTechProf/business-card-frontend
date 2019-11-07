import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FriendsProvider } from '../../providers/friendsProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the FollowRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-follow-requests',
  templateUrl: 'follow-requests.html',
})
export class FollowRequestsPage {
	spinner;
	friends;
	friendImage;
	isFriend;
  constructor(public translateService: TranslateService, private alertCtrl: AlertController, private friendsProvider: FriendsProvider, public navCtrl: NavController, public navParams: NavParams) {
          this.friendsProvider.getFollowRequests('api/auth/getfollowrequests').subscribe((res) => {
            this.spinner = false;
            this.friends = res;
            this.friendImage = SERVER_URL + 'img/users/';
        })
  }

  acceptFollow(friendId, friendName){
	  let alert = this.alertCtrl.create({
	    title: this.translateService.instant("AcceptRequest"),
	    message: this.translateService.instant("AcceptRequestMsg") + friendName,
	    buttons: [
	      {
	        text: this.translateService.instant("Cancel"),
	        role: 'cancel',
	        handler: () => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: this.translateService.instant("Accept"),
	        handler: () => {
			  	this.friendsProvider.acceptFollowRequest('api/auth/user/acceptfollowrequest/' + friendId + '/' + localStorage['user_id']).subscribe((res)=>{
					this.friendsProvider.getFollowRequests('api/auth/getfollowrequests').subscribe((res) => {
						this.friends = res;
						this.friendImage = SERVER_URL + 'img/users/';
					})
			  	})
	        }
	      },
	      {
	        text: this.translateService.instant("AcceptAndFollowBack"),
	        handler: () => {
			  	this.friendsProvider.acceptFollowRequest('api/auth/user/acceptfollowrequest/' + friendId + '/' + localStorage['user_id']).subscribe((res)=>{
					this.friendsProvider.getFollowRequests('api/auth/getfollowrequests').subscribe((res) => {
						this.friends = res;
						this.friendImage = SERVER_URL + 'img/users/';
					})
			  	})
		        let info = {
		            user1_id: localStorage['user_id'],
		            user2_id: friendId
		        }
				this.friendsProvider.isFriend('api/auth/isfriend/' + localStorage['user_id'] + '/' + friendId).subscribe((res)=>{
					if (res['status'] === 'notFriends') {
			  			this.friendsProvider.addFriend(info, 'api/auth/addFriend').subscribe()
					}else{
						this.followAlert()
					}
				})
	        }
	      }
	    ]
	  });
	  alert.present();
  }
  followAlert(){
  	alert('انت بالفعل تتابع هذه البطاقة , ولكن تم قبول طلب متابعته')
  }
}
