import { Injectable } from '@angular/core';
import { HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  constructor(
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token;
    const serverkry = 'AAAApcl8yA4:APA91bEQDF__QCj04p7-K9dOTRQfEd0_qWzWc1ZJlg3zxJDCBtVq0f5LNX2ZelwNBVAwdWegGR7RACxv5lFX9KVPvylwE5q6RjqWf_kiosBfsJ_9gxzuADnsD3hJ_AlEVEqCeV97Y9_A';
    if (serverkry) {
      token = request.clone({
        setHeaders: {
          Authorization: serverkry
        }
      });
    } else {
      token = request.clone({
        setHeaders: {
        }
      });
    }
    return next.handle(token)
      .pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
        }
      }))
      .pipe(catchError((err: HttpEvent<any>) => {
        let message: string;
        if (err instanceof HttpErrorResponse) {
          if (err.error && err.error.message) {
            message = err.error.message;
            // tslint:disable-next-line:whitespace
            // tslint:disable-next-line:no-angle-bracket-type-assertion
            switch ((<HttpErrorResponse>err).status) {
              case 409 || 402:
                message = 'duplicate entry';
                break;
              case 500:
                message = '';
                break;
              case 400:
                message = '';
                break;
              case 401:
                break;
              case 403:
                message = '';
                break;
              case 404:
                break;
              case 412:
                message = '';
                break;
              default:
                return throwError(err);
            }
          }
        }
        return throwError(err);
      }));
  }
}
