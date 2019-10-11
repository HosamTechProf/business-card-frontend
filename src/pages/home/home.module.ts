import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        IonicImageViewerModule,
	    HttpClientModule,
	    TranslateModule.forChild({
	      loader: {
	        provide: TranslateLoader,
	        useFactory: (createTranslateLoader),
	        deps: [HttpClient]
	      }
	    }),
    ],
})
export class HomePageModule { }
