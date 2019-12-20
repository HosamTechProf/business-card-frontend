var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendCardPage } from './friend-card';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicImageViewerModule } from 'ionic-img-viewer';
export function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
var FriendCardPageModule = /** @class */ (function () {
    function FriendCardPageModule() {
    }
    FriendCardPageModule = __decorate([
        NgModule({
            declarations: [
                FriendCardPage,
            ],
            imports: [
                IonicPageModule.forChild(FriendCardPage),
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
    ], FriendCardPageModule);
    return FriendCardPageModule;
}());
export { FriendCardPageModule };
//# sourceMappingURL=friend-card.module.js.map