import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
	lang;
  constructor(private toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController, public translateService: TranslateService, public platform: Platform, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {
  	if (this.platform.isRTL) {
  		this.lang = "عربي";
  	}else{
  		this.lang = "English";
  	}
  }

  changeLanguage(){
   let actionSheet = this.actionSheetCtrl.create({
     buttons: [
       {
         text: 'عربي',
         handler: () => {
		      let loading = this.loadingCtrl.create({
		        content: this.translateService.instant("PleaseWait")
		      });

		      loading.present();

		      setTimeout(() => {
		        loading.dismiss();
		      }, 1000);
            this.platform.setDir('rtl', true)
            this.translateService.use('ar')
            this.storage.set('language', 'ar')
            this.lang = "عربي"
         }
       },
       {
         text: 'English',
         handler: () => {
		      let loading = this.loadingCtrl.create({
		        content: this.translateService.instant("PleaseWait")
		      });

		      loading.present();

		      setTimeout(() => {
		        loading.dismiss();
		      }, 1000);
            this.platform.setDir('ltr', true)
            this.translateService.use('en')
            this.storage.set('language', 'en')
            this.lang = "English"
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
  }

  notification(){
	  let toast = this.toastCtrl.create({
	    message: this.translateService.instant("NotificationSetting"),
	    duration: 3000,
	    position: 'bottom'
	  });
	  toast.present();
  }

  openContact(){
    this.navCtrl.push("ContactPage")
  }

}
