import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(private storage: Storage) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storage.get('token'))
        .pipe(
            switchMap(token => {

                const useFormData = req.body instanceof FormData;

                if (token) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }

                if (!req.headers.has('Content-Type') && !useFormData) {
                    req = req.clone({
                        setHeaders: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
                }

                req = req.clone({
                    setHeaders: {
                        'Device-origin': 'mot-app'
                    }
                });

                return next.handle(req).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // console.log('event--->>>', event);
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        if (error.error.success === false) {
                            console.log('Error 401');
                        } else {
                            console.log('Redirect 401');
                        }
                    }
                    return throwError(error);
                }));
            })
        );
    }
}
