import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthProvider } from '../providers/authProvider'
import { FriendsProvider } from '../providers/friendsProvider'
import { FavouritesProvider } from '../providers/favouritesProvider'

import { IonicStorageModule } from '@ionic/storage';
import { QrCodePageModule } from '../pages/qr-code/qr-code.module';
import { FriendCardPageModule } from '../pages/friend-card/friend-card.module';
import { QRCodeModule } from 'angularx-qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InterceptorProvider } from '../providers/interceptor/interceptor';

import { CacheModule } from "ionic-cache";
import { Camera } from '@ionic-native/camera';
import { AdvertisementProvider } from '../providers/advertisementProvider';
import { SMS } from '@ionic-native/sms';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ShareLinkProvider } from '../providers/shareLink';
import { Push } from '@ionic-native/push';
import { NotificationProvider } from '../providers/notification';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CacheModule.forRoot(),
    HttpClientModule,
    QrCodePageModule,
    FriendCardPageModule,
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    BarcodeScanner,
    FriendsProvider,
    FavouritesProvider,
    InterceptorProvider,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    Camera,
    AdvertisementProvider,
    SMS,
    Deeplinks,
    SocialSharing,
    ShareLinkProvider,
    Push,
    NotificationProvider
  ]
})
export class AppModule { }
