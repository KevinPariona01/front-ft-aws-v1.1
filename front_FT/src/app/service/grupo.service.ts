import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  public url: String = '';
  public credentials: any;
  public basic: any;


  constructor(public _http: HttpClient) {
    this.url =  environment.url;
  }


  getGrupo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'grupo/getGrupo', request, { headers: reqHeader });
  } 

  saveGrupo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'grupo/saveGrupo', request, { headers: reqHeader });
  } 

  updateGrupo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'grupo/updateGrupo', request, { headers: reqHeader });
  } 

  deleteGrupo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'grupo/deleteGrupo', request, { headers: reqHeader });
  }

  cambiarOrdenGrupo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'grupo/cambiarOrdenGrupo', request, { headers: reqHeader });
  }

  uploadfile(extension:any,n_id_grupo:any,fileToUpload:any):Observable<any>{ //USO
            
    const formData: FormData = new FormData();
    formData.append('DA', fileToUpload, fileToUpload.name);
    return this._http.post(this.url+'grupo/uploadimg?extension='+extension+'&n_id_grupo='+n_id_grupo,formData);
    } 


}
