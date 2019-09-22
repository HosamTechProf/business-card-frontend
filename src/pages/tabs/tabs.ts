import { Component } from '@angular/core';
import { IonicPage, Events } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root = "HomePage";
    tab2Root = "MyCardPage";
    tab3Root = "ContactPage";

    constructor(public events: Events) { }

scan() {
  this.events.publish('user:scan');
}

}
