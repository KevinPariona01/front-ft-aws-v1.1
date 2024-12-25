import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from '../../generico/base/base.component';
import { EditProveedorComponent } from '../edit-proveedor/edit-proveedor.component';
import { ConfirmComponent } from '../../generico/confirm/confirm.component';
import { ProveedorService } from 'src/app/service/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','c_nombre_proveedor', 'c_ruc_proveedor', 'c_numero_proveedor', 'c_descripcion_proveedor', 'eliminar'];
  public tablaProveedor!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    override snackBar: MatSnackBar,
    public proveedorService: ProveedorService,
    public dialog: MatDialog,
  ) { super(snackBar) }

  override ngOnInit(): void {
    this.getProveedor();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaProveedor.filter = dato.trim().toLowerCase();
  }

  getProveedor(){
    this.proveedorService.getProveedor({},{}).subscribe( res => {
      
      if(res.status){
        this.tablaProveedor = new MatTableDataSource<any>(res.body.response1);
        this.tablaProveedor.paginator = this.paginator;
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  editarProveedor(valor:any){
    const dialogRef = this.dialog.open(EditProveedorComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { valor: valor}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.getProveedor();

      } catch (error) {
        ////console.log(error);
        this.getProveedor();
      }
    });
  }

  eliminar(valor:any){
    ////console.log("valor => e ", valor);
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el proveedor " + valor.c_nombre_proveedor + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGrupo(valor);
      }
    });
  }

  deleteGrupo(valor:any){
    let parametro = {
      n_id_proveedor: valor.n_id_proveedor
    }
    ////console.log("parametro => ", parametro);
    
    this.proveedorService.deleteProveedor(parametro,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.getProveedor();
        this.openSnackBar("ELIMINADO CORRECTAMENTE", 2500);
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

}
