import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistribucionTipoService {

  public url: String = '';
  public credentials: any;
  public basic: any;


  constructor(public _http: HttpClient) {
    this.url =  environment.url;
  }

  getDistribucionTipoMedida(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'distribucionTipoMedida/getDistribucionTipoMedida', request, { headers: reqHeader });
  } 

  saveDistribucionTipoMedida(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'distribucionTipoMedida/saveDistribucionTipoMedida', request, { headers: reqHeader });
  }

  updateDistribucionTipoMedida(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'distribucionTipoMedida/updateDistribucionTipoMedida', request, { headers: reqHeader });
  }

  deleteDistribucionTipoMedida(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'distribucionTipoMedida/deleteDistribucionTipoMedida', request, { headers: reqHeader });
  }

  cambiarOrdenDistribucionTipoMedida(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'distribucionTipoMedida/cambiarOrdenDistribucionTipoMedida', request, { headers: reqHeader });
  }

  obtenerListaMedidaXGrupo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'distribucionTipoMedida/obtenerListaMedidaXGrupo', request, { headers: reqHeader });
  }

  actualizarPorcentajePorProducto(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'distribucionTipoMedida/actualizarPorcentajePorProducto', request, { headers: reqHeader });
  }

  actualizarEstaticoPorProducto(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'distribucionTipoMedida/actualizarEstaticoPorProducto', request, { headers: reqHeader });
  }


}
