import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCardDesignedPage } from './my-card-designed';

@NgModule({
  declarations: [
    MyCardDesignedPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCardDesignedPage),
  ],
})
export class MyCardDesignedPageModule {}
