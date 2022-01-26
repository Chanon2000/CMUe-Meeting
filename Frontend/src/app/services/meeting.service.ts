import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private Urlport: string = 'http://localhost:3000/api/v1'

  httpHeaders = new HttpHeaders().set(
    'Content-Type','application/json'
  );

  constructor(private http:HttpClient) { }

  getMeetingAll():Observable<any[]> {
    return this.http.get<any>(`${this.Urlport}/meeting`).pipe(
      map(res => Object.values(res['data'])),
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
