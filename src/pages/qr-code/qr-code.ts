import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the QrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-code',
  templateUrl: 'qr-code.html',
})
export class QrCodePage {
  @ViewChild('qrcode') qrcode: ElementRef;
  id;
  constructor(public navParam: NavParams, public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.id = this.navParam.get('id').toString();
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.view.dismiss();
  }

}
