import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { Producto } from 'src/app/interface/producto.interface';
import { ExcelPedidoProductoService } from 'src/app/service/excel-pedido-producto.service';
import { GrupoService } from 'src/app/service/grupo.service';
import { ProductoService } from 'src/app/service/producto.service';
import { BaseComponent } from '../../generico/base/base.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['c_nombre_producto', 'c_descripcion_producto', 'f_precio_producto', 'c_nombre_tipo_medida',  'c_nombre_grupo'];
  public tablaProducto!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  myControl = new FormControl();
  lista_grupos:any = [];
  lista_proveedores:any = [];
  filteredOptions!: Observable<any[]>;

  n_id_grupo:any = null;


  constructor(
    override snackBar: MatSnackBar,
    public productoService:ProductoService,
    public grupoService:GrupoService,
    public dialog: MatDialog,
    public excelPedidoProductoService: ExcelPedidoProductoService
    ) { super(snackBar)
      }

  override ngOnInit(): void {
    this.getPedidoProducto();
    this.getGrupo();
    
  }

  displayFn(user: any): string {
    return user && user.c_nombre_grupo ? user.c_nombre_grupo : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.lista_grupos.filter((option:any) => option.c_nombre_grupo.toLowerCase().includes(filterValue));
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaProducto.filter = dato.trim().toLowerCase();
  }
  
  clearCampo(){
    this.myControl.reset();
    this.n_id_grupo = null;
    this.getPedidoProducto();
  }

  seleccionarGrupo(grupo:any){
    ////console.log("grupo => ", grupo);
    this.n_id_grupo = grupo;
    this.getPedidoProducto();
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

  getPedidoProducto(){
    let parametro = {
      n_id_grupo: this.n_id_grupo
    }
    this.productoService.getPedidoProducto(parametro,{}).subscribe( res => {
      if(res.status){
        this.tablaProducto = new MatTableDataSource<any>(res.body.response1);
        this.tablaProducto.paginator = this.paginator;
        
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  getProductoExportar(){
    let parametro = {
      n_id_grupo: this.n_id_grupo
    }
    this.productoService.getPedidoProducto(parametro,{}).subscribe( res => {
      if(res.status){
        this.exportar(res.body.response1);
        this.tablaProducto.paginator = this.paginator;
        
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  
  exportar(lista: Producto[]){
    this.excelPedidoProductoService.exportarPedidoProducto(lista).subscribe((res)=>{
    });
  }
}
