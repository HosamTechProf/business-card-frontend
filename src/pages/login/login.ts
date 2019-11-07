import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    mobile: string;
    password: string;
    countries;
    countryCode;
    presentToast(message) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }
    constructor(public translateService: TranslateService, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private storage: Storage, private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.authProvider.getCountries('api/auth/getcodes').subscribe((res) => {
            this.countries = res;
        })
    }
    openRegister() {
        this.navCtrl.push("RegisterPage");
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
    login() {
        if (this.mobile != null && this.password != null) {
            let info = {
                mobile: this.mobile,
                password: this.password,
                countryCode: this.countryCode
            };
            let loading = this.loadingCtrl.create({
                spinner: 'hide',
                content: `
          <div class="custom-spinner-container">
            <div class="custom-spinner-box">
               <img src="../../assets/imgs/loader.gif" width="80px" />
            </div>
          </div>`,
                cssClass: 'transparent',
                duration: 2000
            });
            loading.present();

            this.authProvider.registerData(info, 'api/auth/login').subscribe((data) => {
                if (data) {
                    this.storage.set('my_token', data['access_token']);
                    this.navCtrl.setRoot("TabsPage")
                    this.presentToast(this.translateService.instant("LoginSuccess"));
                } else {
                    this.presentToast(this.translateService.instant("EmailPasswordError"));
                }
            })

        }
        else {
            this.presentToast(this.translateService.instant("EmailPasswordError"));
        }
    }

    getCountryCode(code) {
        this.countryCode = code;
    }

}
