import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url: String = '';
  public credentials: any;
  public basic: any;


  constructor(public _http: HttpClient) {
    this.url =  environment.url;
  }


  getProducto(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/getProducto', request, { headers: reqHeader });
  } 

  getProductoXNombre(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/getProductoXNombre', request, { headers: reqHeader });
  } 

  getDatesForEdit(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/getDatesForEdit', request, { headers: reqHeader });
  } 

  saveProducto(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/saveProducto', request, { headers: reqHeader });
  } 

  updateSotck(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/updateSotck', request, { headers: reqHeader });
  }

  updatePedido(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/updatePedido', request, { headers: reqHeader });
  }

  updatePedidoSegunStock(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/updatePedidoSegunStock', request, { headers: reqHeader });
  }

  updateProducto(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/updateProducto', request, { headers: reqHeader });
  } 

  deleteProducto(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/deleteProducto', request, { headers: reqHeader });
  }

  changeActivo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/changeActivo', request, { headers: reqHeader });
  }

  updateDescripcionPedido(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/updateDescripcionPedido', request, { headers: reqHeader });
  }
  
  savePorcentajeDistribucionProducto(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/savePorcentajeDistribucionProducto', request, { headers: reqHeader });
  } 

  
  updatePorcentajeDistribucionProducto(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/updatePorcentajeDistribucionProducto', request, { headers: reqHeader });
  } 

  getDetalleProducto(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/getDetalleProducto', request, { headers: reqHeader });
  } 

  getProductoLike(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/getProductoLike', request, { headers: reqHeader });
  } 
  
  getProductoSegunMedidaYDistribucion(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/getProductoSegunMedidaYDistribucion', request, { headers: reqHeader });
  } 

  getRepetidoCodigoXGrupo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/getRepetidoCodigoXGrupo', request, { headers: reqHeader });
  } 

  getPedidoProducto(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'producto/getPedidoProducto', request, { headers: reqHeader });
  } 

}
