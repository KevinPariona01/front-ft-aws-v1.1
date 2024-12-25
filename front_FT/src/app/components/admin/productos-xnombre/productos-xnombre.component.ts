import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/service/producto.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-productos-xnombre',
  templateUrl: './productos-xnombre.component.html',
  styleUrls: ['./productos-xnombre.component.css']
})
export class ProductosXNombreComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = [ 'c_nombre_producto', 'c_descripcion_producto', 'f_precio_producto', 'c_nombre_tipo_medida', 'c_nombre_grupo'];
  public tablaProducto!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  c_nombre_producto_filtro: string = '';
  minNumeroLetrasFiltro = 4;

  constructor(
    override snackBar: MatSnackBar,
    public productoService:ProductoService,
    public dialog: MatDialog,
    ) { super(snackBar)
      }

  override ngOnInit(): void {
  }

  validarMinimoLetrasFiltro(){
    if(this.c_nombre_producto_filtro.length >= this.minNumeroLetrasFiltro){
      this.getProducto();
    }
    if(this.c_nombre_producto_filtro.length === 0){
      this.tablaProducto = new MatTableDataSource<any>([]);
    }
  }

  getProducto(){
    let parametro = {
      c_nombre_producto: this.c_nombre_producto_filtro
    }
    this.productoService.getProductoXNombre(parametro,{}).subscribe( res => {
      if(res.status){
        this.tablaProducto = new MatTableDataSource<any>(res.body.response1);
        this.tablaProducto.paginator = this.paginator;
        
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  limpiar(){
    this.c_nombre_producto_filtro = '';
    this.validarMinimoLetrasFiltro();
  }

}
