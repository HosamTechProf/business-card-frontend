import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FriendsProvider } from '../../providers/friendsProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ShareLinkProvider } from '../../providers/shareLink';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-my-card-designed',
  templateUrl: 'my-card-designed.html',
})
export class MyCardDesignedPage {
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
    token;
    myId = localStorage['user_id'];
    loading:boolean = true;
    constructor(public translateService: TranslateService, private alertCtrl: AlertController, private shareLinkProvider: ShareLinkProvider, private socialSharing: SocialSharing, public view: ViewController, private friendsProvider: FriendsProvider, public navCtrl: NavController, public navParams: NavParams) {
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
            this.loading = false;
        })
    }

    closeModal() {
        let data = 'noEdit';
        this.view.dismiss(data);
    }
    edit(){
        this.view.dismiss();
        this.navCtrl.push("MyCardPage");
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
    sharelinkAlert() {
      let alert = this.alertCtrl.create({
        title: this.translateService.instant("ShareMyCard"),
        message: this.translateService.instant("ShareMsg"),
        buttons: [
          {
            text: this.translateService.instant("Cancel"),
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: this.translateService.instant("SHARE"),
            handler: () => {
              this.shareLink()
            }
          }
        ]
      });
      alert.present();
    }

}
