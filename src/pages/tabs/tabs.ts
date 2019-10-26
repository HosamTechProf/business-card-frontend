import { Component } from '@angular/core';
import { IonicPage, Events, ModalController, App, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ShareLinkProvider } from '../../providers/shareLink';
import { SERVER_URL } from '../../providers/serverUrl';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { FriendsProvider } from '../../providers/friendsProvider';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root = "HomePage";
    tab2Root;
    token;
    myId = localStorage['user_id'];
	base64Image;
	friendId;

    constructor(private friendsProvider: FriendsProvider, private http: HttpClient, private camera: Camera, private toastCtrl: ToastController, public translateService: TranslateService, private alertCtrl: AlertController, private shareLinkProvider: ShareLinkProvider, private socialSharing: SocialSharing, private storage: Storage, private app: App, public modalCtrl: ModalController, public events: Events) {
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
	    title: this.translateService.instant("ShareApp"),
	    message: this.translateService.instant("ShareAppMsg"),
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

	        }
	      }
	    ]
	  });
	  alert.present();
	}

	scanAlert(){
	  let alert = this.alertCtrl.create({
	    title: this.translateService.instant("ChooseScanMethod"),
	    buttons: [
	      {
	        text: this.translateService.instant("AddFromGallery"),
	        handler: () => {
	          this.uploadImage()
	        }
	      },
	      {
	        text: this.translateService.instant("ScanQrCode"),
	        handler: () => {
	        	this.scan()
	        }
	      }
	    ]
	  });
	  alert.present();
	}

    uploadImage(){
        const options: CameraOptions = {
            quality: 90,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            targetHeight: 500,
            targetWidth: 500
        }

        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.addFriendFromGallery()
        }, (err) => {
            console.log(err)
        });
    }

    presentToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }

    addFriendFromGallery(){
        let info = {
            image: this.base64Image
        }
        this.friendsProvider.addFriendFromGalleryBackend(info, 'api/auth/addFriendFromGallery').subscribe((res)=>{
            this.http.get('http://api.qrserver.com/v1/read-qr-code/?fileurl=' + encodeURIComponent(SERVER_URL + 'img/users/' + res['photo'])).subscribe((data)=>{
                if (data["0"].symbol["0"].data == null) {
                    this.presentToast(data["0"].symbol["0"].error)
                }else{
                    this.friendId = data["0"].symbol["0"].data;
                    let info = {
                        user1_id: localStorage['user_id'],
                        user2_id: this.friendId
                    }
                    this.friendsProvider.addFriend(info, 'api/auth/addFriend').subscribe(()=>{
                        this.presentToast(this.translateService.instant('addFriendFromGalleryMsg'))
                    })
                }
            })
        })
    }
}
