import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SERVER_URL } from '../../providers/serverUrl';

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
  socialLink:string = '';
  base64Image:string = '';
  isPublic;
  userImage = SERVER_URL + 'img/users/user.svg';
  countries;
  country;
  countryCode;
  countryRegionCode;
  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
  constructor(private camera: Camera, public toastCtrl: ToastController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
    this.authProvider.getCountries('codes').subscribe((res)=>{
      this.countries = res['countries'];
    })
  }

  uploadImage(){
    const options: CameraOptions = {
    quality: 90,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
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

  register(){
    if (this.name == "") {
      this.presentToast('من فضلك اكتب اسمك')
    }
     else if(this.email == ""){
      this.presentToast('من فضلك اكتب بريدك الالكتروني')
    }else if(this.mobile == ""){
      this.presentToast('من فضلك اكتب رقم الجوال')
    }else if(this.company == ""){
      this.presentToast('من فضلك اكتب المنشأة او الشركة')
    }else if(this.password == ""){
      this.presentToast('من فضلك اكتب كلمة المرور')
    }else if(this.c_password == ""){
      this.presentToast('من فضلك اعد كتابة كلمة المرور')
    }else if(this.password != this.c_password){
      this.presentToast('كلمتين المرور غير متطابقتين')
    }
    else if(this.desc == ""){
      this.presentToast('من فضلك اكتب نبذة تعريفية عن نفسك')
    }
    else if(this.socialLink == ""){
      this.presentToast('من فضلك اكتب لينك تواصل اجتماعي')
    }
    else if(this.country == ""){
      this.presentToast('من فضلك اختار دولتك')
    }
    else{
      let info = {
        email : this.email,
        password : this.password,
        c_password : this.c_password,
        mobile : this.mobile,
        name : this.name,
        company : this.company,
        desc : this.desc,
        phone : this.countryRegionCode + this.phone,
        socialLink : this.socialLink,
        image : this.base64Image,
        isPublic : this.isPublic,
        countryCode : this.countryCode
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
getCountryCode(code){
  this.countryCode = code;
}
}
