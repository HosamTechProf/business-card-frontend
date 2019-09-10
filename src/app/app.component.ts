import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
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

    constructor(public modalCtrl: ModalController, private deeplinks: Deeplinks, private cache: CacheService, private storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.platform.ready().then(() => {
            this.cache.setDefaultTTL(60 * 60 * 12);
            this.cache.setOfflineInvalidate(false);
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            this.initRootPage();
            this.deepLinking();
        });
    }

    protected initRootPage() {
        this.storage.get('my_token').then((val) => {
            this.rootPage = val ? 'TabsPage' : 'LoginPage';
        })
    }

    protected deepLinking() {
        this.deeplinks.route({
            '/user/:id': 'user',
        }).subscribe(match => {
            if (match.$route === 'user') {
                // do whatever you want, you can navigate to profile page and send the id as a parameter
                let profileModal = this.modalCtrl.create('FriendCardPage', { id: match.$args.id });
                profileModal.present();
            }
        }, nomatch => {
            console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
        });
    }
}
