import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { FriendsProvider } from '../../providers/friendsProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ScanMethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-method',
  templateUrl: 'scan-method.html',
})
export class ScanMethodPage {
	base64Image;
	friendId;
  constructor(private friendsProvider: FriendsProvider, private http: HttpClient, private camera: Camera, private toastCtrl: ToastController, public translateService: TranslateService, public events: Events, private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

    closeModal() {
        this.view.dismiss();
    }

	scan() {
		this.events.publish('user:scan');
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
