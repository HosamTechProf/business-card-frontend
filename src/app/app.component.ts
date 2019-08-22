import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(private cache: CacheService, private storage : Storage,public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.initializeApp();
  }
    initializeApp(){
    this.platform.ready().then(() => {
      this.cache.setDefaultTTL(60 * 60 * 12);
      this.cache.setOfflineInvalidate(false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
