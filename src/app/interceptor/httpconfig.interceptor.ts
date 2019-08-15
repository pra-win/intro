import { Injectable } from '@angular/core';
//import { ErrorDialogService } from '../error-dialog/errordialog.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { LoadingService } from './../services/loading.service';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class HttpConfigInterceptor {
  constructor(private router:Router, private auth:AuthService, private loading: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         this.loading.setLoading(true);
        const token: string = localStorage.getItem('token');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('TestH', 'TestHeader') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);

                    if(!event.headers.get('Is-Logged-In') || event.headers.get('Is-Logged-In') === 'false') {
                      console.log(event.headers.get('Is-Logged-In'));
                      this.router.navigate(['/login']);
                      this.auth.setLoggedIn(false);
                    }
                    this.loading.setLoading(false);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                  let data = {};
                  data = {
                      reason: error && error.error.reason ? error.error.reason : '',
                      status: error.status
                  };
                  console.error(data);
                  this.loading.setLoading(false);
                  //this.errorDialogService.openDialog(data);
                  return throwError(error);
              }));
    }


}
