import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { BaseComponent } from '../../generico/base/base.component';
import { ProductoService } from 'src/app/service/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GrupoService } from 'src/app/service/grupo.service';
import { FormControl } from '@angular/forms';
import { DistribucionTipoService } from 'src/app/service/distribucion-tipo.service';

@Component({
  selector: 'app-cambio-porcentaje-tipo-medida',
  templateUrl: './cambio-porcentaje-tipo-medida.component.html',
  styleUrls: ['./cambio-porcentaje-tipo-medida.component.css']
})
export class CambioPorcentajeTipoMedidaComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['c_nombre_producto','c_detalle_primario_producto', 'c_nombre_distribucion_tipo_medida','f_valor_porcentaje', 'f_valor_venta', 'f_precio_estatico'];
  public tablaProductos!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  
  myControl = new FormControl();
  lista_grupos:any = [];
  filteredOptions!: Observable<any[]>;
  n_id_grupo:any = null;
  n_id_distribucion_tipo_medida:any = null;
  lista_medidas:any = [];

  dolar:number = 0;
  igv:number = 0;

  constructor(
    override snackBar: MatSnackBar,
    public productoService: ProductoService,
    public grupoService:GrupoService,
    public distribucionTipoService:DistribucionTipoService,
    public dialog: MatDialog,
  ){ super(snackBar)}

  override ngOnInit(): void {
    this.getGrupo();
    this.obtenerValoresPrincipales();
  }

  obtenerValoresPrincipales(){
    this.dolar = parseFloat(localStorage.getItem('dolar')!);
    this.igv = parseFloat(localStorage.getItem('igv')!);
  }

  displayFn(user: any): string {
    return user && user.c_nombre_grupo ? user.c_nombre_grupo : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.lista_grupos.filter((option:any) => option.c_nombre_grupo.toLowerCase().includes(filterValue));
  }
  
  clearCampo(){
    this.myControl.reset();
  }

  getGrupo(){
    this.grupoService.getGrupo({},{}).subscribe( res => {
      if(res.status){
        this.lista_grupos = res.body.response1;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.c_nombre_grupo;
            return name ? this._filter(name as string) : this.lista_grupos.slice();
          }),
        );
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  getProductoSegunMedidaYDistribucion(){
    let parametro = {
      n_id_grupo: this.n_id_grupo,
      n_id_distribucion_tipo_medida: this.n_id_distribucion_tipo_medida
    }
    this.productoService.getProductoSegunMedidaYDistribucion(parametro,{}).subscribe( res => {
      //console.log("res => ", res);
      
      if(res.status){
        this.tablaProductos = new MatTableDataSource<any>(this.getPrecioVentaSegunMedida(res.body.response1));
        this.tablaProductos.paginator = this.paginator;
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  getPrecioVentaSegunMedida(data:any){
    
    data.map((d:any) => {
      let precioProducto = d.f_precio_producto;
      if(d.b_dolar_producto){
        precioProducto = precioProducto*this.dolar;
      }
      if(d.b_igv_producto){
        precioProducto = precioProducto +precioProducto*this.igv;
      }
      d.f_valor_venta = parseFloat((Math.ceil((precioProducto * d.f_distribucion_tipo_medida + precioProducto * d.f_distribucion_tipo_medida * d.f_valor_porcentaje) * 10) / 10).toFixed(2));

    });
    //console.log("datos => ", data);
    return data;
  }

  seleccionarGrupo(grupo:any){
    ////console.log("grupo => ", grupo);
    this.n_id_grupo = grupo;
    this.obtenerListaMedidaXGrupo();
  }

  obtenerListaMedidaXGrupo(){
    let parametro = {
      n_id_grupo: this.n_id_grupo,
    }
    this.distribucionTipoService.obtenerListaMedidaXGrupo(parametro,{}).subscribe( res => {
      if(res.status){
        this.lista_medidas = res.body.response1;
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  seleccionarTipoMedida(n_id_distribucion_tipo_medida:any){
    this.n_id_distribucion_tipo_medida = n_id_distribucion_tipo_medida;
    this.getProductoSegunMedidaYDistribucion();
  }


  editarPorcentaje(producto:any){
    let parametro = {
      n_id_distribucion_tipo_medida: producto.n_id_distribucion_tipo_medida,
      n_id_producto: producto.n_id_producto,
      n_id_grupo: producto.n_id_grupo,
      f_valor_porcentaje: producto.f_valor_porcentaje

    }

    //console.log("producto a editar => ", parametro);
    this.distribucionTipoService.actualizarPorcentajePorProducto(parametro, {}).subscribe(res => {
      if(res.status){
        this.openSnackBar("ACTUALIZADO CORRECTAMENTE", 2500);
        this.getProductoSegunMedidaYDistribucion();
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  editarPrecioEstatico(producto:any){
    let parametro = {
      n_id_distribucion_tipo_medida: producto.n_id_distribucion_tipo_medida,
      n_id_producto: producto.n_id_producto,
      n_id_grupo: producto.n_id_grupo,
      f_precio_estatico: producto.f_precio_estatico

    }

    //console.log("producto a editar => ", parametro);
    this.distribucionTipoService.actualizarEstaticoPorProducto(parametro, {}).subscribe(res => {
      if(res.status){
        this.openSnackBar("ACTUALIZADO CORRECTAMENTE", 2500);
        this.getProductoSegunMedidaYDistribucion();
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

}
