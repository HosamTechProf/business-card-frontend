import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";
import { BranchIo } from '@ionic-native/branch-io';
import { Deeplinks } from '@ionic-native/deeplinks';
import { AboutPage } from '../pages/about/about';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(private deeplinks: Deeplinks, private branch: BranchIo, private cache: CacheService, private storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.cache.setDefaultTTL(60 * 60 * 12);
            this.cache.setOfflineInvalidate(false);
            this.statusBar.styleLightContent();
            this.splashScreen.hide();



            this.deeplinks.route({
                '/about': AboutPage,
            }).subscribe(match => {
                // match.$route - the route we matched, which is the matched entry from the arguments to route()
                // match.$args - the args passed in the link
                // match.$link - the full link data
                console.log('Successfully matched route', match);
            }, nomatch => {
                // nomatch.$link - the full link data
                console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
            });



            // this.branchInit();
        });

        // this.platform.resume.subscribe(() => this.branchInit());

        this.storage.get('my_token').then((val) => {
            this.rootPage = val ? 'TabsPage' : 'LoginPage';
        })
    }

    // protected branchInit() {
    //     if (!this.platform.is("cordova")) { return; }
    //     const Branch = window["Branch"];
    //     Branch.setDebug(true);

    //     Branch.initSession().then(data => {
    //         // Branch.getFirstReferringParams().then(function(res) {
    //         //     alert("Response: " + JSON.stringify(res));
    //         // }).catch(function(err) {
    //         //     alert("Error: " + JSON.stringify(err));
    //         // });
    //         Branch.getLatestReferringParams()
    //             .then(function(res) {
    //                 alert("Response: " + JSON.stringify(res));
    //             })
    //             .catch(function(err) {
    //                 alert("Error: " + JSON.stringify(err));
    //             });
    //         // console.log(JSON.stringify(data))
    //         // var properties = {
    //         //     canonicalIdentifier: "content/123",
    //         //     canonicalUrl: "https://example.com/content/123",
    //         //     title: "Content 123 Title",
    //         //     contentDescription: "Content 123 Description " + Date.now(),
    //         //     contentImageUrl: "http://lorempixel.com/400/400/",
    //         //     price: 12.12,
    //         //     currency: "GBD",
    //         //     contentIndexingMode: "private",
    //         //     contentMetadata: {
    //         //         custom: "data",
    //         //         testing: 123,
    //         //         this_is: true
    //         //     }
    //         // };
    //         // var analytics = {
    //         //     channel: "facebook",
    //         //     feature: "onboarding",
    //         //     campaign: "content 123 launch",
    //         //     stage: "new user",
    //         //     tags: ["one", "two", "three"]
    //         // };

    //         // // optional fields
    //         // var properties2 = {
    //         //     $desktop_url: "http://card.rbsapps.com/desktop",
    //         //     $android_url: "http://businesscard.app.link",
    //         //     $ios_url: "http://card.rbsapps.com/ios",
    //         //     $ipad_url: "http://card.rbsapps.com/ipad",
    //         //     $deeplink_path: "content/123",
    //         //     $match_duration: 2000,
    //         //     custom_string: "data",
    //         //     custom_integer: Date.now(),
    //         //     custom_boolean: true
    //         // };
    //         // var branchUniversalObj = null;
    //         // Branch.createBranchUniversalObject(properties).then(function(res) {
    //         //     branchUniversalObj = res;
    //         //     branchUniversalObj.generateShortUrl(analytics, properties2).then(function(res) {
    //         //         console.log("Response: " + JSON.stringify(res.url));
    //         //     }).catch(function(err) {
    //         //         console.log("Error: " + JSON.stringify(err));
    //         //     });
    //         // }).catch(function(err) {
    //         //     alert("Error: " + JSON.stringify(err));
    //         // });
    //     });
    // }
}
