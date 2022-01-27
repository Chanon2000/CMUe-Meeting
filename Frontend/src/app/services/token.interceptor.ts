import { AuthService } from './../modules/auth/_services/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userDetailToken = localStorage.getItem('userDetailToken')
    // const currentUser = JSON.parse(userDetailToken ? userDetailToken : '');
    const currentUser = userDetailToken ? JSON.parse(userDetailToken) : null; 
    const token = (currentUser) ? currentUser.token : null;
    const role = (currentUser) ? currentUser.role : null;
    console.log(req)

    // ถ้า login ไม่ต้อง set header
    if(req.url.indexOf("/user/login") === -1){
      req = req.clone({
       headers: req.headers.set('token', token)
      });
    }

    return next.handle(req).pipe(
      tap((ev: HttpEvent<any>) => { }),

      // ถ้า backend ยิง error กลับมา
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        // cann't access admin
        if (error.status === 401) {
          this.authService.logout();
          if (role !== 'customer') {
            this.router.navigate(['/admin']);
            // this.router.navigate(['/']);
          } else {
            this.router.navigate(['/login']);
          }
        }else if(error.status === 401){
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}

