import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendCardPage } from './friend-card';

@NgModule({
  declarations: [
    FriendCardPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendCardPage),
  ],
})
export class FriendCardPageModule {}
