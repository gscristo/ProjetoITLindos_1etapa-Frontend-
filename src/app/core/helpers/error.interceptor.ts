import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ResponseModel } from '../services/models/response-model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // make logout if 401 response returned from api

                location.reload();
            }
            if (err.status === 400) {
              return throwError(new HttpResponse({ status: 400, body: new ResponseModel(err.error.content, err.error.message, err.error.statusCode)}))
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
