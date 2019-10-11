import { Component } from '@angular/core';
import { IonicPage, Events, ModalController, App, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ShareLinkProvider } from '../../providers/shareLink';
import { SERVER_URL } from '../../providers/serverUrl';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root = "HomePage";
    tab2Root;
    token;
    myId = localStorage['user_id'];

    constructor(public translateService: TranslateService, private alertCtrl: AlertController, private shareLinkProvider: ShareLinkProvider, private socialSharing: SocialSharing, private storage: Storage, private app: App, public modalCtrl: ModalController, public events: Events) {
     }

	scan() {
		this.events.publish('user:scan');
	}
	openMyCard(){
		let modal = this.modalCtrl.create('MyCardDesignedPage', {id:localStorage['user_id']});
		modal.present();
	}
	clearSearch(){
		this.events.publish('user:clearSearch');
	}
	ngAfterViewInit(){
			let el = document.getElementById('tab-t0-0');
			if (el) {
		    	el.addEventListener('click', event => {
		    		this.clearSearch();
		    	});
			}
	}
    logout() {
        localStorage.clear();
        this.storage.clear();
        let newRootNav = <NavController>this.app.getRootNavById('n4');
        newRootNav.push("LoginPage")
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

	logoutAlert() {
	  let alert = this.alertCtrl.create({
	    title: this.translateService.instant("LOGOUT"),
	    message: this.translateService.instant("LogoutMessage"),
	    buttons: [
	      {
	        text: this.translateService.instant("Cancel"),
	        role: 'cancel',
	        handler: () => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: this.translateService.instant("LOGOUT"),
	        handler: () => {
	          this.logout()
	        }
	      }
	    ]
	  });
	  alert.present();
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
