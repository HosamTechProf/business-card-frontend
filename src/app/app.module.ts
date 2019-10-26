import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
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
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Contacts } from '@ionic-native/contacts';
import { ContactProvider } from '../providers/contact';

import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { PhotoLibrary } from '@ionic-native/photo-library';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    QRCodeModule,
    IonicImageViewerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
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
    NotificationProvider,
    Contacts,
    ContactProvider,
    FileTransfer,
    File,
    PhotoLibrary
  ]
})
export class AppModule { }
