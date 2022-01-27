import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, Observable, BehaviorSubject, of } from "rxjs";
import { map, switchMap, catchError, finalize } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthModel } from "../_models/auth.model";
import { UserModel } from "../_models/user.model";
import { AuthHTTPService } from "./auth-http/auth-http.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  // private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private authLocalStorageToken = '';

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    // this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(identity_code: string, password: string): Observable<UserModel> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(identity_code, password).pipe(
      map((auth: AuthModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem('userDetailToken');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('login');
    this.router.navigate(['/login'], {
      queryParams: {},
    });
  }

  home() {
    this.router.navigate(['/']);
  }

  isSuperBoss(user:any){
    if(user.role === "superboss"){
      return true;
    }
    return false;
  }

  getUserDetail(): any {
    const authCheck = localStorage.getItem('login');
    if (authCheck === 'true') {
      const local = localStorage.getItem('userDetailToken'); 
      const user = local ? JSON.parse(local) : null;
      this.currentUserSubject = new BehaviorSubject<UserModel>(user);
      return user;
    }
    return null;
  }

  getUserDetailToken(): any {
    const authCheck = localStorage.getItem('login');
    if (authCheck === 'true') {
      const local = localStorage.getItem('userDetailToken'); 
      const user = local ? JSON.parse(local) : null;
      this.currentUserSubject = new BehaviorSubject<UserModel>(user);
      return user;
    }
    return null;
  }

  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.accessToken).pipe(
      map((user: UserModel) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  getToken(code: string): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .getToken(code)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): any {
    try {
      // const authData = JSON.parse(localStorage.getItem(this.authLocalStorageToken));
      const local = localStorage.getItem(this.authLocalStorageToken); 
      const authData = local ? JSON.parse(local) : null;

      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}