import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { AuthService } from '.././auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToasterService, private router: Router, private authservice: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 400:
              errorMessage = 'Bad Request: Please check your input data';
              break;
            case 401:
              errorMessage = 'Unauthorized: Please login again';
              this.router.navigate(['/login']);
              localStorage.removeItem('token');
              this.authservice.isLogged = () => false;
              break;
            case 403:
              errorMessage = 'Access denied, Please login again';
              localStorage.removeItem('token');
              this.router.navigate(['/login']);
              this.authservice.isLogged = () => false;
              break;
            case 404:
              errorMessage = 'Resource not found';
              this.router.navigate(['/not-found']);
              break;
            case 500:
              errorMessage = 'Server error';
              break;
            default:
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }

        this.toastr.ErrorToaster(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
