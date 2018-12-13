import { NgxSpinnerService } from 'ngx-spinner';
import { empty, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          const error = httpErrorResponse.error;

          if (error.message) {
            if (error.data) {
              alert(JSON.stringify(error.data));
            } else {
              alert(error.message);
            }
          }

          this.spinner.hide();

          return empty();
        })
      );
  }
}
