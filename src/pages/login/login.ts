import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    email: string;
    password: string;
    presentToast(message) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }
    constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, private storage: Storage, private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
    }
    openRegister() {
        this.navCtrl.push("RegisterPage");
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
    login() {
        if (this.email != null && this.password != null) {
            let info = {
                email: this.email,
                password: this.password,
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
                duration: 3000
            });
            loading.present();

            this.authProvider.registerData(info, 'api/auth/login').subscribe((data) => {
                if (data) {
                    this.storage.set('my_token', data['access_token']);
                    this.navCtrl.setRoot("TabsPage")
                    this.presentToast('Login Successful');
                } else {
                    this.presentToast('Invalid Username or Password');
                }
            })

        }
        else {
            this.presentToast('Invalid Username or Password');
        }
    }
}
