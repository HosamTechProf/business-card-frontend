import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, Nav, Events, AlertController, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";
import { Deeplinks } from '@ionic-native/deeplinks';
import { ShareLinkProvider } from '../providers/shareLink';
import { NotificationProvider } from '../providers/notification';
import { AuthProvider } from '../providers/authProvider';
import { Observable } from 'rxjs';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav;
    rootPage: any;

    constructor(private app: App, private alertCtrl: AlertController, private authProvider: AuthProvider, public translateService: TranslateService, public events: Events, private notificationProvider: NotificationProvider, private push: Push, private shareLinkProvider: ShareLinkProvider, public modalCtrl: ModalController, private deeplinks: Deeplinks, private cache: CacheService, private storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.platform.ready().then(() => {
            this.cache.setDefaultTTL(60 * 60 * 12);
            this.cache.setOfflineInvalidate(false);
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            this.choseLanguage();
            this.deepLinking();
            this.notification();
            this.events.subscribe('user:notification', eventData => {
              this.notification();
            });
            this.authProvider.getUserData('api/auth/user').subscribe((res)=>{
            },err=>{
                if (err.error.error === "Unauthenticated.") {
                    localStorage.clear();
                    this.storage.clear();
                    let newRootNav = <NavController>this.app.getRootNavById('n4');
                    newRootNav.push("LoginPage")
                }
            })
        });
    }

    protected choseLanguage(){
        this.storage.get('language').then((val) => {
            if(val){
                this.initRootPage()
                this.translateService.use(val);
                if (val == 'en') {
                    this.platform.setDir('ltr', true)
                }else{
                    this.platform.setDir('rtl', true)
                }
            }else{
                let languageModal = this.modalCtrl.create('ChooseLanguagePage');
                languageModal.onDidDismiss(data => {
                    this.translateService.use(data);
                if (data == 'en') {
                    this.platform.setDir('ltr', true)
                }else{
                    this.platform.setDir('rtl', true)
                }
                    this.initRootPage()
                });
                languageModal.present();
            }
        })
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
                    if (res['status'] == 'false1') {
                        let modal = this.modalCtrl.create('MyCardDesignedPage', {id:localStorage['user_id']});
                        modal.present();
                    }
                    else if(res['status'] == 'false2'){
                        alert(res['msg'])
                    }
                    else if (res['status'] == true){
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
                     this.notificationProvider.addDeviceToken('api/auth/adddevicetoken', info).subscribe()
                     });
    }

}
