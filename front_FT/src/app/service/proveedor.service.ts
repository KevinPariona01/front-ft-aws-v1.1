import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  public url: String = '';
  public credentials: any;
  public basic: any;

  constructor(public _http: HttpClient) {
    this.url =  environment.url;
  }

  getProveedor(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'proveedor/getProveedor', request, { headers: reqHeader });
  } 

  saveProveedor(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'proveedor/saveProveedor', request, { headers: reqHeader });
  } 

  updateProveedor(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'proveedor/updateProveedor', request, { headers: reqHeader });
  } 

  deleteProveedor(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'proveedor/deleteProveedor', request, { headers: reqHeader });
  }

}
