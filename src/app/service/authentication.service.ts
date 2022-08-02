import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host: string = environment.apiUrl;
  private token: string = "";
  private loggedInUsername: string = "";
  private _isLoggedIn: boolean = false;
  private jwtHelper = new JwtHelperService();

  constructor( private http: HttpClient) { 
  }

  public login(user: User): Observable<HttpResponse<User> >{
    return this.http.post<User>  (`${this.host}/auth/v1/login`, user, {observe: 'response'});
      // (`${this.host}/authorization-service/auth/v1/login`, user, {observe: 'response'});
     
  }

  public register(user: User): Observable<User>{
    return this.http.post<User>  (`${this.host}/auth/v1/register`, user);
      // (`${this.host}/authorization-service/auth/v1/register`, user);
  }

  //TODO: add method and model for this as well!
  public authenticate(user: User): Observable<HttpResponse<any>>{
    return this.http.post<User>
      (`${this.host}/authorization-service/auth/v1/authenticate`, user, {observe: 'response'});
  }

  public isLoggedIn(): boolean{
    this.loadToken();
    if(this.token!=null && this.token !==''){
      if(this.jwtHelper.decodeToken(this.token).sub!=null || ''){
        if(!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }
    else{
      this.logout();
      return false;
    }
    return false;
  }

  public logout(): void{
    this.token="";
    this.loggedInUsername="";
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  public saveToken(token: string): void{
    this.token=token;
    localStorage.setItem('token', token);
  }

  public loadToken(): void{
    this.token = localStorage.getItem('token') || "";
  }

  public getToken(): string{
    return this.token;
  }

  public addUserToLocalCache(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User{
    return JSON.parse( localStorage.getItem('user') || '{}' );
  }
  
}
