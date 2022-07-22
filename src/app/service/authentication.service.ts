import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host: string = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;

  constructor( private http: HttpClient) { 
  }

  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.http.post<HttpResponse <any> | HttpErrorResponse>
      (`${this.host}/authorization-service/auth/v1/login`, user, {observe: 'response'});
  }

  public register(user: User): Observable<User | HttpErrorResponse>{
    return this.http.post<User | HttpErrorResponse>
      (`${this.host}/authorization-service/auth/v1/register`, user);
  }

  //TODO: add method and model for this as well!
  public authenticate(user: User): Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.http.post<User | HttpErrorResponse>
      (`${this.host}/authorization-service/auth/v1/register`, user, {observe: 'response'});
  }

  public logout(): void{
    this.token=null;
    this.loggedInUsername=null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  public saveToken(token: string): void{
    this.token=token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User{
    return JSON.parse(localStorage.getItem('user'));
  }
  
}
