import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { catchError, mergeMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { NavController, App } from 'ionic-angular'
@Injectable()
export class InterceptorProvider implements HttpInterceptor {

    constructor(private app: App, private storage: Storage) { }

    // Intercepts all HTTP requests!
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let promise = this.storage.get('my_token');

        return Observable.fromPromise(promise)
            .mergeMap(token => {
                let clonedReq = this.addToken(request, token);
                return next.handle(clonedReq).pipe(
                    catchError(error => {
                        let msg = error.message;
                        // let alert = this.alertCtrl.create({
                        //     title: error.name,
                        //     message: msg,
                        //     buttons: ['OK']
                        // });
                        // // alert.present();
                        if (error.error.error && error.error.error === "Unauthenticated.") {
                            localStorage.clear();
                            this.storage.clear();
                            let newRootNav = <NavController>this.app.getRootNavById('n4');
                            newRootNav.push("LoginPage")
                        }
                        return _throw(error);
                    })
                );
            });
    }

    // Adds the token to your headers if it exists
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${token}`
                }
            });
            return clone;
        }

        return request;
    }
}
