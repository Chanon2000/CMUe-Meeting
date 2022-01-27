import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthModel } from "../../_models/auth.model";
import { UserModel } from "../../_models/user.model";

const API_ENDPLOINT = `http://localhost:3000/api/v1`;
 
@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }
 
  login(identity_code: string, password: string): Observable<any> {
    return this.http.post<AuthModel>(`${API_ENDPLOINT}/user/login`,   { identity_code, password });
  }
 
//   forgotPassword(email: string): Observable<boolean> {
//     return this.http.post<boolean>(`${API_ENDPLOINT}/forgot-password`, {
//       email,
//     });
//   }
 
  getUserByToken(token:any): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<UserModel>(`${API_ENDPLOINT}`, {
      headers: httpHeaders,
    });
  }
 
  getToken(authorizationCode:any):Observable<any> {
    const queryString = "?authorizationCode=" + authorizationCode
    return this.http.get<UserModel>(`${API_ENDPLOINT}system/getToken` + queryString);
  }
}
 

