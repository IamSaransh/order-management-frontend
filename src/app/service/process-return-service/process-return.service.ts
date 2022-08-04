import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProcessReturnRequest } from '../../model/process-return-request';
import { ProcessReturnResponse } from '../../model/process-return-response';



@Injectable({
  providedIn: 'root'
})
export class ProcessReturnService  {
  public host: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    ) { }


  public processComponmentRequest(processReturnRequest: ProcessReturnRequest)
    : Observable<HttpResponse<ProcessReturnResponse>>
  {
    return this.http.post<ProcessReturnResponse>  (`${this.host}/process/v1/processDetail`,  processReturnRequest,
      {observe: 'response'});
  }  

}


