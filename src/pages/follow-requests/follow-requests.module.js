var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowRequestsPage } from './follow-requests';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
export function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
var FollowRequestsPageModule = /** @class */ (function () {
    function FollowRequestsPageModule() {
    }
    FollowRequestsPageModule = __decorate([
        NgModule({
            declarations: [
                FollowRequestsPage,
            ],
            imports: [
                IonicPageModule.forChild(FollowRequestsPage),
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
    ], FollowRequestsPageModule);
    return FollowRequestsPageModule;
}());
export { FollowRequestsPageModule };
//# sourceMappingURL=follow-requests.module.js.map