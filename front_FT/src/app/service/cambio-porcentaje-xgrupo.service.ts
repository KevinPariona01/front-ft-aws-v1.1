import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CambioPorcentajeXGrupoService {

  public url: String = '';
  public credentials: any;
  public basic: any;


  constructor(public _http: HttpClient) {
    this.url =  environment.url;
  }


  getGrupoXPorcentaje(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'cambioPorcentajeXGrupo/getGrupoXPorcentaje', request, { headers: reqHeader });
  } 

  updatePorcetanejeXGrupo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'cambioPorcentajeXGrupo/updatePorcetanejeXGrupo', request, { headers: reqHeader });
  } 

  CambiarPorcentajeGrupal(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/CambiarPorcentajeGrupal', request, { headers: reqHeader });
  } 


}
