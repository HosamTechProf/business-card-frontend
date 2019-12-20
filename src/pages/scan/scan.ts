import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Platform, ToastController, Slides, ModalController, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { trigger, style, animate, transition } from '@angular/animations';
import { FriendsProvider } from '../../providers/friendsProvider';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ShareLinkProvider } from '../../providers/shareLink';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SERVER_URL } from '../../providers/serverUrl';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  animations: [
    trigger(
      'myAnimation',
      [
        transition(':enter',
          [style({ transform: 'rotate(180deg)', opacity: 0 }),
          animate('500ms ease-in', style({ transform: 'rotate(0)', 'opacity': 1 }))]),
        transition(':leave',
          [style({ transform: 'rotate(0)', 'opacity': 1 }),
          animate('500ms ease-out', style({ transform: 'rotate(180deg)', 'opacity': 0 }))])
      ])],
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
	@ViewChild(Slides) slides: Slides;
  scanSubscription;
  button = "Scan"
  myId = localStorage['user_id']
  x;
  y;
  token;
  base64Image;
  friendId;
  constructor(private http: HttpClient, public platform: Platform, public translateService: TranslateService, private camera: Camera, private shareLinkProvider: ShareLinkProvider, private socialSharing: SocialSharing, private photoLibrary: PhotoLibrary, private alertCtrl: AlertController, public modalCtrl: ModalController, private friendsProvider: FriendsProvider, private toastCtrl: ToastController, private qrScanner: QRScanner, public navCtrl: NavController) {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop()
    });
  }
  ionViewWillEnter() {
    this.scan();
  }
  ionViewWillLeave() {
    this.stopScanning();
  }
  scan() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          this.scanSubscription = this.qrScanner.scan().subscribe((text:string) => {
            let info = {
                'user1_id': localStorage['user_id'],
                'user2_id': text
            }
            this.friendsProvider.addFriend(info, 'api/auth/addFriendQr').subscribe((data) => {
                if (data['status']) {
                    this.navCtrl.pop()
                    let friendCard = this.modalCtrl.create('FriendCardPage', { id: text });
                    friendCard.present();
                }
            }, (err) => {
                this.presentToast("خطأ برجاء المسح مرة أخري");
            })
          });
        } else {
          console.error('Permission Denied', status);
        }
      })
      .catch((e: any) => {
        console.error('Error', e);
      });
  }

  stopScanning() {
    (this.scanSubscription) ? this.scanSubscription.unsubscribe() : null;
    this.scanSubscription=null;
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

  goToScan() {
    this.slides.slideTo(1, 500);
    this.button = "QR"
  }

  goToQR() {
    this.slides.slideTo(0, 500);
    this.button = "Scan"
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex == 0) {
    	this.button = "Scan"
    }else{
    	this.button = "QR"
    }
  }

  close(){
  	this.navCtrl.pop()
  }

  presentToast(message) {
      const toast = this.toastCtrl.create({
          message: message,
          duration: 3000
      });
      toast.present();
  }

  share(){
    let alert = this.alertCtrl.create({
      title: 'أختار الطريقة',
      buttons: [
        {
          text: 'حفظ الي الصور',
          handler: () => {
            let ul = <HTMLImageElement>document.getElementById("myImg");
            let url = ul.src
            console.log(url)
            this.photoLibrary.requestAuthorization({read:true,write:true}).then(()=>{
                this.photoLibrary.saveImage(url, 'Business Card').then((res)=>{
                  let alert = this.alertCtrl.create({
                    title: 'تم حفظ الصورة',
                    buttons: ['OK']
                  });
                  alert.present();
                }).catch((err)=>{
                    console.log(err)
                });
            })
          }
        },
        {
          text: 'مشاركة رابط',
          handler: () => {
            this.shareLink()
          }
        }
      ]
    });
    alert.present();
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
