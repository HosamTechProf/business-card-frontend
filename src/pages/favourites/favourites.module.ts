import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouritesPage } from './favourites';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
    declarations: [
        FavouritesPage,
    ],
    imports: [
        IonicPageModule.forChild(FavouritesPage),
        IonicImageViewerModule
    ],
})
export class FavouritesPageModule { }
