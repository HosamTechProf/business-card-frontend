import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SERVER_URL } from '../../providers/serverUrl';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    name: string = '';
    password: string = '';
    c_password: string = '';
    mobile: string = '';
    base64Image: string = '';
    isPublic = true;
    userImage = SERVER_URL + 'img/users/user.svg';
    countries;
    country;
    countryCode;
    countryDialCode;
    presentToast(message) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
        });
        toast.present();
    }
    constructor(public translateService: TranslateService, public events: Events, private camera: Camera, public toastCtrl: ToastController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
        this.authProvider.getCountries('api/auth/getcodes').subscribe((res) => {
            this.countries = res;
        })
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

    register() {
        if (this.name == "") {
            this.presentToast(this.translateService.instant("NameError"))
        }
        else if (this.mobile == "") {
            this.presentToast(this.translateService.instant("MobileError"))
        }else if (this.password == "") {
            this.presentToast(this.translateService.instant("PASSWORDERROR"))
        } else if (this.c_password == "") {
            this.presentToast(this.translateService.instant("RePasswordError"))
        } else if (this.password != this.c_password) {
            this.presentToast(this.translateService.instant("RePasswordError"))
        }
        else {
            let info = {
                password: this.password,
                c_password: this.c_password,
                mobile: this.mobile,
                name: this.name,
                image: this.base64Image,
                isPublic: this.isPublic,
                countryCode: this.countryCode
            }

            this.authProvider.registerData(info, 'api/auth/register').subscribe((data) => {
                if (data['status']) {
                    this.navCtrl.push("TabsPage");
                    // localStorage['my_token'] = data['success'].token;
                    this.storage.set('my_token', data['success'].token);
                    this.presentToast(data['msg']);
                    this.events.publish('user:notification');
                }
            }, (err) => {
                console.log(err['error']['error'])
                this.presentToast(Object.keys(err['error'].error).map(key => err['error'].error[key])['0']);
            })
        }

    }
    getCountryCode(code) {
        this.countryCode = code;
    }
}
