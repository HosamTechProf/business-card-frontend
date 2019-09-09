import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";
import { BranchIo } from '@ionic-native/branch-io';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(private branch: BranchIo, private cache: CacheService, private storage : Storage,public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.initializeApp();
  }
    initializeApp(){
    this.platform.ready().then(() => {
      this.cache.setDefaultTTL(60 * 60 * 12);
      this.cache.setOfflineInvalidate(false);
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      branchInit();
    });
    this.platform.resume.subscribe(() => {
      branchInit();
    });

    // Branch initialization
    const branchInit = () => {
      // only on devices
      if (!this.platform.is("cordova")) {
        return;
      }
      const Branch = window["Branch"];
      Branch.initSession().then(data => {
        if (data["+clicked_branch_link"]) {
          // read deep link data on click
          alert("Deep Link Data: " + JSON.stringify(data));
        }
        console.log(data)
      });
    };

  this.storage.get('my_token').then((val)=>{
    if(val == null){
      this.rootPage = "LoginPage";
    }else{
      this.rootPage = "TabsPage";
    }
  })

  }
}
