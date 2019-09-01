import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  name:string = '';
  email:string = '';
  password:string = '';
  c_password:string = '';
  phone:string;
  mobile:string = '';
  company:string = '';
  desc:string = '';
    presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  constructor(public toastCtrl: ToastController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register(){
    if (this.name == "") {
      this.presentToast('Please Write Your Name')
    }
     else if(this.email == ""){
      this.presentToast('Please Write Your Email')
    }else if(this.mobile == ""){
      this.presentToast('Please Write Your Mobile Number')
    }else if(this.company == ""){
      this.presentToast('Please Enter Your Company')
    }else if(this.password == ""){
      this.presentToast('Please Write A Password')
    }else if(this.c_password == ""){
      this.presentToast('Please Write Password Again')
    }else if(this.password != this.c_password){
      this.presentToast('Invalid Password')
    }
    else if(this.desc == ""){
      this.presentToast('Please Write About Yourself')
    }
    else{
      let info = {
        // username : this.username,
        email : this.email,
        password : this.password,
        c_password : this.c_password,
        mobile : this.mobile,
        name : this.name,
        company : this.company,
        desc : this.desc,
        phone : this.phone
      }

      this.authProvider.registerData(info, 'api/auth/register').subscribe((data)=>{
        if (data['status']) {
          this.navCtrl.push("TabsPage");
          // localStorage['my_token'] = data['success'].token;
          this.storage.set('my_token', data['success'].token);
          this.presentToast(data['msg']);
        }
      },(err)=>{
        console.log(err['error']['error'])
        this.presentToast(Object.keys(err['error'].error).map(key => err['error'].error[key])['0']);
      })
    }

  }

}
