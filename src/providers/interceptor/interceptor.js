var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
var InterceptorProvider = /** @class */ (function () {
    function InterceptorProvider(storage) {
        this.storage = storage;
    }
    // Intercepts all HTTP requests!
    InterceptorProvider.prototype.intercept = function (request, next) {
        var _this = this;
        var promise = this.storage.get('my_token');
        return Observable.fromPromise(promise)
            .mergeMap(function (token) {
            var clonedReq = _this.addToken(request, token);
            return next.handle(clonedReq).pipe(catchError(function (error) {
                var msg = error.message;
                // let alert = this.alertCtrl.create({
                //     title: error.name,
                //     message: msg,
                //     buttons: ['OK']
                // });
                // // alert.present();
                return _throw(error);
            }));
        });
    };
    // Adds the token to your headers if it exists
    InterceptorProvider.prototype.addToken = function (request, token) {
        if (token) {
            var clone = void 0;
            clone = request.clone({
                setHeaders: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                    Authorization: "Bearer " + token
                }
            });
            return clone;
        }
        return request;
    };
    InterceptorProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], InterceptorProvider);
    return InterceptorProvider;
}());
export { InterceptorProvider };
//# sourceMappingURL=interceptor.js.map