import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, App, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'page-my-card',
    templateUrl: 'my-card.html',
})
export class MyCardPage {
    id: string = '';
    name: string = '';
    email: string = '';
    password: string = '';
    phone: string = '';
    mobile: string = '';
    company: string = '';
    desc: string = '';
    socialLink: string = '';
    isPublic;
    userDataArray = {};
    base64Image: string = '';
    userImage;
    edittable;
    myCardData;
    constructor(public translateService: TranslateService, public modalCtrl: ModalController, private storage: Storage, private app: App, public toastCtrl: ToastController, private camera: Camera, public alertCtrl: AlertController, private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.authProvider.getUserData('api/auth/user').subscribe((res) => {
            this.id = res['id']
            this.name = res['name']
            this.email = res['email']
            this.password = res['password']
            this.phone = res['phone']
            this.company = res['company']
            this.desc = res['desc']
            this.mobile = res['mobile']
            this.isPublic = res['isPublic']
            this.socialLink = res['socialLink']
            this.userImage = SERVER_URL + 'img/users/' + res['image']
        });
        this.edittable = true;
    }
    presentToast(message) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
        });
        toast.present();
    }
    uploadImage() {
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
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.userImage = 'data:image/jpeg;base64,' + imageData

        }, (err) => {
            console.log(err)
        });

    }
    edit() {
        this.edittable = true;
    }

    update() {
        this.edittable = false;
        let info = {
            email: this.email,
            password: this.password,
            mobile: this.mobile,
            name: this.name,
            company: this.company,
            desc: this.desc,
            phone: this.phone,
            socialLink: this.socialLink,
            isPublic: this.isPublic,
            image: this.base64Image
        }
        this.authProvider.updateUserData(info, 'api/auth/updateUser').subscribe((res) => {
            this.userImage = SERVER_URL + 'img/users/' + res['image']
            this.presentToast(this.translateService.instant("CardEdditedSuc"))
        })
    }

    logout() {
        localStorage.clear();
        this.storage.clear();
        // this.app.getRootNav().setRoot("LoginPage");
        let newRootNav = <NavController>this.app.getRootNavById('n4');
        newRootNav.push("LoginPage")
    }
    back() {
        this.navCtrl.setRoot("TabsPage")
    }
}
