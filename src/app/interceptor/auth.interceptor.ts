import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    //for the login and register we don't want to modify the request. Let it continue its cousrse.
    if(httpRequest.url.includes(`auth/v1/login` )){
      return httpHandler.handle(httpRequest);
    }
    if(httpRequest.url.includes(`${this.authenticationService.host}/auth/v1/register` )){
      return httpHandler.handle(httpRequest);
    }
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    //clone request, add herder for authorization and then pass the request
    const authAddedRequest = httpRequest.clone({setHeaders: {Authorization : `Bearer ${token}`}});
    return httpHandler.handle(authAddedRequest);
  }
}
