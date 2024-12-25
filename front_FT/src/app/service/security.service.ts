import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public url: String = '';
  public credentials: any;
  public basic: any;
  public isAdmin: boolean = false;


  constructor(public _http: HttpClient) {
    this.url =  environment.url;
  }

  validateCredentials(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'security/validateCredentials', request, { headers: reqHeader });
  } 

}
