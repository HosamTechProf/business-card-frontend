import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/authProvider';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ActivationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})
export class ActivationPage {
	@ViewChild('code0') code0;
	@ViewChild('code1') code1;
	@ViewChild('code2') code2;
	@ViewChild('code3') code3;
	code: any = [];
	loading = false;
	mobileNumber;
	token;
  constructor(private storage: Storage, private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.mobileNumber = this.navParams.get('mobileNumber')
  	this.token = this.navParams.get('token')
  }

	clearInput(index) {
		if(this.code[index] == null) return;
		if(this.code[index].toString().length == 1) this.code[index] = null;
	}
	focusOnFrom(next, ci) { // ci => current index
		if(this.code[ci] == null) return;
		if(this.code[ci].toString().length < 1) return;
		if(isNaN(this.code[ci])) {
			this.code[ci] = null;
			return;
		}
		if(this.code[ci].toString().length == 1) {
			if(next.value) this.detectInput();
			else next.setFocus();
		}
		else if(this.code[ci].toString().length == 4) {
			this.code = this.code[ci].toString().split('');
			this.verify();
		} else {
			var codes = this.code[ci].toString().split('');
			for (var i = ci; i < codes.length; i++) {
				this.code[i] = codes[i];
			}
		}
	}

	detectInput() {
		for (var i = 0; i < 4; i++) {
			if(!this.code[i]) {
				this[`code${i}`].setFocus();
				return;
			}
		}
	}

	detectkey(pi, e) { // pi => previous index
		if(e.keyCode == 8) {
			this.code[pi] = null;
			this[`code${pi}`].setFocus();
		}
	}

	verify(){
		this.loading = true;
		let info = {
			code: this.code.join(''),
			mobile: this.mobileNumber
		}
		this.authProvider.verifyCode(info, 'api/auth/verifycode').subscribe((res)=>{
			this.loading = false;
			if (res['status'] === true) {
				this.navCtrl.setRoot("TabsPage")
				this.storage.set('my_token', this.token);
			}else{
				alert('الكود غير صحيح')
			}
		})
	}

	validateCode() {
		return !(this.code.length == 4);
	}
}
