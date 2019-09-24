import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";
import { BranchIo } from '@ionic-native/branch-io';
import { Deeplinks } from '@ionic-native/deeplinks';
import { AboutPage } from '../pages/about/about';
import { ShareLinkProvider } from '../providers/shareLink';
import { NotificationProvider } from '../providers/notification';
import { Observable } from 'rxjs';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

declare let window: any;
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav;
    rootPage: any;

    constructor(public events: Events, private notificationProvider: NotificationProvider, private push: Push, private shareLinkProvider: ShareLinkProvider, public modalCtrl: ModalController, private deeplinks: Deeplinks, private cache: CacheService, private storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.platform.ready().then(() => {
            this.cache.setDefaultTTL(60 * 60 * 12);
            this.cache.setOfflineInvalidate(false);
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            this.initRootPage();
            this.deepLinking();
            this.notification();
            this.events.subscribe('user:notification', eventData => {
              this.notification();
            });
        });

    }

    protected initRootPage() {
        this.storage.get('my_token').then((val) => {
            this.rootPage = val ? 'TabsPage' : 'LoginPage';
        })
    }

    protected deepLinking() {
        this.deeplinks.route({
            '/user/:id/:token': 'user',
        }).subscribe(match => {
            if (match.$route === 'user') {
                // do whatever you want, you can navigate to profile page and send the id as a parameter
                let info = {
                    'token' : match.$args.token,
                    'user_id' : match.$args.id,
                    'user2_id' : localStorage['user_id']
                }
                this.shareLinkProvider.updateShare('api/auth/updateshare', info).subscribe((res)=>{
                    console.log(res)
                    console.log(res['status'])
                    if (res['status'] == 'false1') {
                        this.nav.push("MyCardPage");
                        // alert(res['msg'])
                    }
                    else if(res['status'] == 'false2'){
                        alert(res['msg'])
                    }
                    else{
                        let profileModal = this.modalCtrl.create('FriendCardPage', { id: match.$args.id });
                        profileModal.present();
                    }
                })
            }
        }, nomatch => {
            console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
        });

    }

    protected notification(){
        const options: PushOptions = {
           android: {},
           ios: {
               alert: 'true',
               badge: true,
               sound: 'false'
           },
           windows: {},
           browser: {
               pushServiceURL: 'http://push.api.phonegap.com/v1/push'
           }
        };
        const pushObject: PushObject = this.push.init(options);
        pushObject.on('notification').subscribe((notification: any) =>
            console.log('Received a notification', notification));
                pushObject.on('registration').subscribe((registration: any) =>{
                    let info = {
                        'deviceToken' : registration['registrationId']
                    }
                    console.log(info)
                     this.notificationProvider.addDeviceToken('api/auth/adddevicetoken', info).subscribe()
                     });
    }

}
