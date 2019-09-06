import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(private deeplinks: Deeplinks, private cache: CacheService, private storage : Storage,public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.initializeApp();
  }
    initializeApp(){
    this.platform.ready().then(() => {
      this.cache.setDefaultTTL(60 * 60 * 12);
      this.cache.setOfflineInvalidate(false);
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.deeplinks.route({

   }).subscribe(match => {
     // match.$route - the route we matched, which is the matched entry from the arguments to route()
     // match.$args - the args passed in the link
     // match.$link - the full link data
     console.log('Successfully matched route', match);
   }, nomatch => {
     // nomatch.$link - the full link data
     console.error('Got a deeplink that didn\'t match', nomatch);
   });
    });

  this.storage.get('my_token').then((val)=>{
    if(val == null){
      this.rootPage = "LoginPage";
    }else{
      this.rootPage = "TabsPage";
    }
  })

  }
}
