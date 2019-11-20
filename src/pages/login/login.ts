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
                console.log(data)
                if (data['message']==='Authorized') {
                    this.storage.set('my_token', data['access_token']);
                    this.navCtrl.setRoot("TabsPage")
                    this.presentToast(this.translateService.instant("LoginSuccess"));
                } else if (data['message']==='Unauthorized') {
                    this.presentToast(this.translateService.instant("EmailPasswordError"));
                }else if (data['message']==='Active Account') {
                    this.presentToast('برجاء تفعيل هذا الحساب');
                    this.http.get('http://www.alsaad2.net/api/sendsms.php?username=faisalaljohni&password=a1234567&message=' + 'رقم التفعيل الخاص بك هو : ' + data['code'] + '&numbers=' + data['mobile'] + '&return=json&sender=School').map((res)=>{
                        this.navCtrl.push('ActivationPage', {mobileNumber:data['mobile'],token:data['access_token']})
                    })
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
