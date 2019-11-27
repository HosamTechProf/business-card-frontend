import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

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
    loading = false;
    presentToast(message) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }
    constructor(public http: HttpClient, public translateService: TranslateService, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private storage: Storage, private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.authProvider.getCountries('api/auth/getcodes').subscribe((res) => {
            this.countries = res;
        })
    }
    openRegister() {
        this.navCtrl.push("RegisterPage");
    }

    login() {
        this.loading = true;
        if (this.mobile != null && this.password != null) {
            let info = {
                mobile: this.mobile,
                password: this.password,
                countryCode: this.countryCode
            };
            this.authProvider.registerData(info, 'api/auth/login').subscribe((data) => {
                this.loading = false;
                if (data['message']==='Authorized') {
                    this.storage.set('my_token', data['access_token']);
                    this.navCtrl.setRoot("TabsPage")
                    this.presentToast(this.translateService.instant("LoginSuccess"));
                } else if (data['message']==='Unauthorized') {
                    this.presentToast(this.translateService.instant("EmailPasswordError"));
                }else if (data['message']==='Active Account') {
                    this.presentToast('برجاء تفعيل هذا الحساب');
                    let information = {
                        code : data['code'],
                        mobile : data['mobile']
                    }
                    this.authProvider.sendCode(information, 'api/auth/sendcode').subscribe((res)=>{
                        this.navCtrl.push('ActivationPage', {mobileNumber:data['mobile'],token:data['access_token']})
                    })
                }
            },err=>{
                this.loading = false;
                this.presentToast("خطأ في رقم الجوال او كلمة المرور")
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
