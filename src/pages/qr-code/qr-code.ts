import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FriendsProvider } from '../../providers/friendsProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-qr-code',
    templateUrl: 'qr-code.html',
})
export class QrCodePage {
    @ViewChild('qrcode') qrcode: ElementRef;
    id: any = '';
    base64Image;
    friendId;
    constructor(private toastCtrl: ToastController, private http: HttpClient, private camera: Camera, private friendsProvider: FriendsProvider, public translateService: TranslateService, private alertCtrl: AlertController, private photoLibrary: PhotoLibrary, private el: ElementRef, public navParam: NavParams, public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
        this.id = this.navParam.get('id').toString();
     }

    ionViewDidLoad() {

    }

    closeModal() {
        this.view.dismiss();
    }

    download() {
        let test = 'https://i.ibb.co/0C6XddC/Screenshot-2019-10-17-14-09-53-85.png';
        console.log(encodeURIComponent(test))
        let el = document.querySelector('qrcode');
        let url = el.children[1].getAttribute('src');
        this.photoLibrary.requestAuthorization({read:true,write:true}).then(()=>{
            this.photoLibrary.saveImage(url, 'Business Card').then((res)=>{
              let alert = this.alertCtrl.create({
                title: this.translateService.instant('PhotoSaved'),
                buttons: [this.translateService.instant('Ok')]
              });
              alert.present();
            }).catch((err)=>{
                console.log(err)
            });
        })
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
