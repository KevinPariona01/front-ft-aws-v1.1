import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/service/producto.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { GrupoService } from 'src/app/service/grupo.service';
import { TipoMedidaService } from 'src/app/service/tipo-medida.service';

@Component({
  selector: 'app-dinamico-producto-edit',
  templateUrl: './dinamico-producto-edit.component.html',
  styleUrls: ['./dinamico-producto-edit.component.css']
})
export class DinamicoProductoEditComponent extends BaseComponent implements OnInit {

  //VARIABLES
  table:any = [];
  cabecera:any = [];

  n_id_grupo:any = null;
  myControlProducto = new FormControl();
  myControlTipoMedida = new FormControl();
  filteredOptionsProducto!: Observable<any[]>;
  filteredOptionsTipoMedida!: Observable<any[]>;
  lista_grupos:any = [];
  lista_tipo_medidas:any = [];
  n_id_tipo_medida:any = null;

  constructor(
      override snackBar: MatSnackBar,
      public productoService:ProductoService,
      public grupoService:GrupoService,
      public tipoMedidaService: TipoMedidaService
    ) { super(snackBar)}

  override ngOnInit(
    
  ): void {
    this.getGrupo();
    this.getTipoMedida();
  }

  search(){
    this.getProductByTipoMedidaDistribucion();
  }

  getGrupo(){
    this.grupoService.getGrupo({},{}).subscribe( res => {
      if(res.status){
        this.lista_grupos = res.body.response1;
        this.filteredOptionsProducto = this.myControlProducto.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.c_nombre_grupo;
            return name ? this._filterProducto(name as string) : this.lista_grupos.slice();
          }),
        );
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  private _filterProducto(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.lista_grupos.filter((option:any) => option.c_nombre_grupo.toLowerCase().includes(filterValue));
  }

  private _filterTipoMedida(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.lista_tipo_medidas.filter((option:any) => option.c_nombre_tipo_medida.toLowerCase().includes(filterValue));
  }

  seleccionarGrupo(grupo:any){
    ////console.log("grupo => ", grupo);
    this.n_id_grupo = grupo;
  }

  displayProducto(user: any): string {
    return user && user.c_nombre_grupo ? user.c_nombre_grupo : '';
  }

  displayTipoMedida(user: any): string {
    return user && user.c_nombre_tipo_medida ? user.c_nombre_tipo_medida : '';
  }

  clearCampoProducto(){
    this.myControlProducto.reset();
  }

  clearCampoTipoMedida(){
    this.myControlTipoMedida.reset();
  }

  getTipoMedida(){
    this.tipoMedidaService.getTipoMedida({},{}).subscribe( res => {
      if(res.status){
        this.lista_tipo_medidas = res.body.response1;
        this.filteredOptionsTipoMedida = this.myControlTipoMedida.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.c_nombre_tipo_medida;
            return name ? this._filterTipoMedida(name as string) : this.lista_tipo_medidas.slice();
          }),
        );
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  seleccionarTipoMedida(valor:any){
    this.n_id_tipo_medida = valor;
  }

  getProductByTipoMedidaDistribucion(){
    let request = {
      n_id_grupo: this.n_id_grupo,
      n_id_tipo_medida: this.n_id_tipo_medida
    }
    this.productoService.getProductByTipoMedidaDistribucion(request,{}).subscribe( res => {
      if(res.status){
        if(res.body.response2.length > 0){
          this.cabecera = (res.body.response1);
          this.table = (res.body.response2);
        }else{
          this.cabecera = [];
          this.table = [];
          this.openSnackBar("NO HAY INFORMACION CON ESOS FILTROS", 2500);  
        }
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  onInputChange(productId: number, inputValue: any, cabecera:any) {
    let c_tipo = '';
    console.log("ID del Producto:", productId);
    console.log("Valor del Input:", inputValue.target.value);
    console.log("Valor del cabecera:", cabecera);
    if(cabecera.nombre.includes(this.ESTATICO)){
      c_tipo = this.ESTATICO
    }else{
      c_tipo = this.PORCENTAJE
    }
    let request = {
      n_id_grupo : this.n_id_grupo,
      n_id_producto : productId,
      n_id_distribucion_tipo_medida : cabecera.valor,
      c_tipo : c_tipo,
      f_valor : inputValue.target.value
    }
    this.updatePorcentajeDistribucionProductoEstaticoOrPorcentaje(request);
  }

  updatePorcentajeDistribucionProductoEstaticoOrPorcentaje(request:any){
    this.productoService.updatePorcentajeDistribucionProductoEstaticoOrPorcentaje(request,{}).subscribe( res => {
      if(res.status){
        this.getProductByTipoMedidaDistribucion();
        this.openSnackBar("ACTUALIZADO CORRECTAMENTE", 2500);
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

}
