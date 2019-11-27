import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';
import { ContactProvider } from '../../providers/contact';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {
	name;
	email;
	message;
    constructor(private toastCtrl: ToastController,public translateService: TranslateService, private contactProvider: ContactProvider, public navCtrl: NavController) {}

    sendMessage(){
    	let info = {
    		name: this.name,
    		email: this.email,
    		message: this.message
    	}
    	this.contactProvider.sendMessage(info, 'api/auth/sendcontactus').subscribe((res)=>{
			let toast = this.toastCtrl.create({
				message: this.translateService.instant("MessageSent"),
				duration: 3000,
				position: 'bottom'
			});
			toast.present();
    		this.navCtrl.pop()
    	})
    }
}
