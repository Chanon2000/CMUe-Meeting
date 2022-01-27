import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from '../modules/auth/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private Urlport: string = 'http://localhost:3000/api/v1'
  httpHeaders = new HttpHeaders().set(
    'Content-Type','application/json'
  );

  constructor(private http:HttpClient,private authService: AuthService) { }

  getUserAll() {
    return this.http.get(`${this.Urlport}/users`).pipe(
      // map(res => Object.values(res['data'])),
      catchError(this.handlerError)
    )
  }

  getUserById(id:string) {
    return this.http.get(`${this.Urlport}/users/${id}`).pipe(
      catchError(this.handlerError)
    )
  }

  loginUser(obj:any) {
    return this.http.post(`${this.Urlport}/users/login`, obj).pipe(
      catchError(this.handlerError)
    )
  }

  signUpMember(signUpForm:any) {
    return this.http.post(`${this.Urlport}/users/signup`, signUpForm).pipe(
      catchError(this.handlerError)
    )
  }


  handlerError(error:HttpErrorResponse){
    console.log('💥 Error:')
    let errMsg='';
    if(error.error instanceof ErrorEvent){
      errMsg = error.error.message;
    }else{
      errMsg = error.status + ',' + error.message;
    }
    return throwError(errMsg);
  }
}
