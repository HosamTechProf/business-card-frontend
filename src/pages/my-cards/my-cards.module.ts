import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCardsPage } from './my-cards';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
    declarations: [
        MyCardsPage,
    ],
    imports: [
        IonicPageModule.forChild(MyCardsPage),
        IonicImageViewerModule
    ],
})
export class MyCardsPageModule { }
