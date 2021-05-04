import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
      if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');
        const authReq = request.clone({
            setHeaders: {
                Authorization: token
            }
        });
        return next.handle(authReq)
            .pipe(catchError((error)=>{
                console.log(error);
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        this.router.navigateByUrl('/auth/login');
                    }
                }
                return throwError(error);
            }))
    }
    return next.handle(request);
    }
}
