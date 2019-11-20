import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivationPage } from './activation';

@NgModule({
  declarations: [
    ActivationPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivationPage),
  ],
})
export class ActivationPageModule {}
