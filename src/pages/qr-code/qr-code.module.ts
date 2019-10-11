import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCodePage } from './qr-code';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        QrCodePage,
    ],
    imports: [
        IonicPageModule.forChild(QrCodePage),
        QRCodeModule,
	    TranslateModule.forChild({
	      loader: {
	        provide: TranslateLoader,
	        useFactory: (createTranslateLoader),
	        deps: [HttpClient]
	      }
	    }),
    ],
})
export class QrCodePageModule { }
