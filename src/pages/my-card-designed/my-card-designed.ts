import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FriendsProvider } from '../../providers/friendsProvider';

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
    constructor(public view: ViewController, private friendsProvider: FriendsProvider, public navCtrl: NavController, public navParams: NavParams) {
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
    alert(){
        alert('هذه الخاصية غير موجودة في عرض شكل بطاقتك')
    }
}
