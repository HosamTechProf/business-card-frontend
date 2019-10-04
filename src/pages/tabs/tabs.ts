import { Component } from '@angular/core';
import { IonicPage, Events, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root = "HomePage";
    tab2Root;

    constructor(public modalCtrl: ModalController, public events: Events) {
     }

	scan() {
		this.events.publish('user:scan');
	}
	openMyCard(){
		let modal = this.modalCtrl.create('MyCardDesignedPage', {id:localStorage['user_id']});
		modal.present();
	}
	clearSearch(){
		this.events.publish('user:clearSearch');
	}
  ngAfterViewInit(){
    	document.getElementById('tab-t0-0').addEventListener('click', event => {
    		this.clearSearch();
    	});
	}
}
