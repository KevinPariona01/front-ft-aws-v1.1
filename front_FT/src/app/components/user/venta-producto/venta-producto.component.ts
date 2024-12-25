import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/service/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { VentaProductoDetalleComponent } from '../venta-producto-detalle/venta-producto-detalle.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-venta-producto',
  templateUrl: './venta-producto.component.html',
  styleUrls: ['./venta-producto.component.css']
})
export class VentaProductoComponent extends BaseComponent implements OnInit {


  displayedColumns: string[] = [ 'c_nombre_producto', 'c_descripcion_producto',  'c_stock', 'n_activo'];
  public tablaProducto!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  n_id_grupo:any = null;

  constructor(
    public productoService:ProductoService,
    override snackBar: MatSnackBar,
    public grupoService: ProductoService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    ){ super(snackBar)}


  override ngOnInit(): void {
    this.n_id_grupo = this.route.snapshot.paramMap.get("id");
    this.getProducto();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    ////console.log(dato);
    this.tablaProducto.filter = dato.trim().toLowerCase();
  }
  
  getProducto(){
    let parametro = {
      n_id_grupo: this.n_id_grupo
    }
    ////console.log("parametro => ", parametro);
    this.productoService.getProducto(parametro,{}).subscribe( res => {
      ////console.log("res d => ", res);
      ////console.log("res s => ", res.status);
      if(res.status){
        this.tablaProducto = new MatTableDataSource<any>(res.body.response1);
        this.tablaProducto.paginator = this.paginator;
        
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  verDetalle(valor:any){
    const dialogRef = this.dialog.open(VentaProductoDetalleComponent, {
      panelClass: 'custom-dialog-container',
      width: '95vw',
      maxHeight: '95vh',
      data: { valor: valor}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        

      } catch (error) {
        ////console.log(error);
        
      }
    });
  }

  returnHome(){
    this.router.navigate([`venta-grupo`]);
  }

  

}
