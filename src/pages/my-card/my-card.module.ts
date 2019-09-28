import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCardPage } from './my-card';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
    declarations: [
        MyCardPage,
    ],
    imports: [
        IonicPageModule.forChild(MyCardPage),
        IonicImageViewerModule
    ],
})
export class MyCardPageModule { }
