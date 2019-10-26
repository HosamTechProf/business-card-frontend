import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCardDesignedPage } from './my-card-designed';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicImageViewerModule } from 'ionic-img-viewer';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyCardDesignedPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCardDesignedPage),
    HttpClientModule,
    IonicImageViewerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
})
export class MyCardDesignedPageModule {}
