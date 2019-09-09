import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCodePage } from './qr-code';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    declarations: [
        QrCodePage,
    ],
    imports: [
        IonicPageModule.forChild(QrCodePage),
        QRCodeModule
    ],
})
export class QrCodePageModule { }
