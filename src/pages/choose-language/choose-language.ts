import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChooseLanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-language',
  templateUrl: 'choose-language.html',
})
export class ChooseLanguagePage {

  constructor(private view: ViewController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  chooseLanguage(lang){
	this.storage.set('language', lang);
	let data = lang
    this.view.dismiss(data);
  }

}
