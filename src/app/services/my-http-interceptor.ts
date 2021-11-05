import { Injectable, Injector } from '@angular/core';
import { InjectionToken, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable} from "rxjs";
import { throwError } from 'rxjs';
import { timeout, catchError, map, mapTo } from "rxjs/operators";

//import 'rxjs/add/observable/throw'
//import 'rxjs/add/operator/catch';
const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
const defaultTimeout = 120000;
@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
   constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout) { }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("request intercepted successfully!" + Number(req.headers.get('timeout')));
    const timeout = Number(req.headers.get('timeout')) || this.defaultTimeout;
    return next.handle(req);
 /*    req = req.clone({
      withCredentials: true
    });
    
    return next.handle(req); */
 }
}