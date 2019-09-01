import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { SERVER_URL } from '../../providers/serverUrl';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the MyCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-card',
  templateUrl: 'my-card.html',
})
export class MyCardPage {
  userData:Array<any> = [];
  userDataType:any
  name:string = '';
  email:string = '';
  password:string = '';
  phone:string = '';
  mobile:string = '';
  company:string = '';
  desc:string = '';
  isPublic
  userDataArray={};
  base64Image:string = '';
  userImage;
  constructor(private camera: Camera, public alertCtrl: AlertController, private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
   this.authProvider.getUserData('api/auth/user').subscribe((res)=>{
      this.userData.push(res)
      this.userDataType = res
      this.name = res['name']
      this.email = res['email']
      this.password = res['password']
      this.phone = res['phone']
      this.company = res['company']
      this.desc = res['desc']
      this.mobile = res['mobile']
      this.isPublic = res['isPublic']
      this.userImage = SERVER_URL + 'img/users/' + res['image']
      this.userDataArray = {
        email : this.email,
        password : this.password,
        phone : this.phone,
        name : this.name,
        company : this.company,
        desc : this.desc,
        mobile : this.mobile
      }
    });
  }
      changePrivacy(){
        if (this.isPublic == 1) {
          this.isPublic = 0;
        }
        else{
          this.isPublic = 1;
        }
        let info = {
          isPublic: this.isPublic
        }
        this.authProvider.updateUserData(info, 'api/auth/updateUser').subscribe((data)=>{
         })
      }
  showPrompt(value, name, placeholder, title) {
    const prompt = this.alertCtrl.create({
      title: "تعديل " + title,
      inputs: [
        {
          name: name,
          placeholder: "اكتب " + placeholder,
          value: this.userDataArray[name]
        },
      ],
      buttons: [
        {
          text: 'الغاء',
        },
        {
          text: 'تعديل',
          handler: data => {
            this.updateData(data)
          }
        }
      ]
    });
    prompt.present();
  }
  updateData(data){
      let info = {
        email : data.email,
        password : data.password,
        phone : data.phone,
        name : data.name,
        mobile : data.mobile,
        desc : data.desc,
        company : data.company
      }
          this.authProvider.registerData(info, 'api/auth/updateUser').subscribe((data)=>{
        if (data) {
          this.name = data['name']
          this.phone = data['phone']
          this.mobile = data['mobile']
          this.email = data['email']
          this.desc = data['desc']
          this.company = data['company']
          this.userDataArray = {
            email : this.email,
            password : this.password,
            phone : this.phone,
            name : this.name,
            company : this.company,
            mobile : this.mobile,
            desc : this.desc
          }
        }else{
          // this.presentToast(alert);
        }
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
 let info = {
  image: this.base64Image
 }
this.authProvider.updateUserData(info, 'api/auth/updateUser').subscribe((data)=>{
    this.userImage = SERVER_URL + 'img/users/' + data['image']
    console.log(this.userImage)
 })
}, (err) => {
 console.log(err)
});

  }
}
