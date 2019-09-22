import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-qr-code',
    templateUrl: 'qr-code.html',
})
export class QrCodePage {
    @ViewChild('qrcode') qrcode: ElementRef;
    id: any = '';
    constructor(public navParam: NavParams, public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
        this.id = this.navParam.get('id').toString();
     }

    ionViewDidLoad() {
        console.log(this.id)
    }

    closeModal() {
        this.view.dismiss();
    }
}
