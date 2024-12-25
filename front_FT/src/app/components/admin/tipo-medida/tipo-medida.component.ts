import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TipoMedidaService } from 'src/app/service/tipo-medida.service';
import { BaseComponent } from '../../generico/base/base.component';
import { ConfirmComponent } from '../../generico/confirm/confirm.component';
import { EditTipoMedidaComponent } from '../edit-tipo-medida/edit-tipo-medida.component';

@Component({
  selector: 'app-tipo-medida',
  templateUrl: './tipo-medida.component.html',
  styleUrls: ['./tipo-medida.component.css']
})
export class TipoMedidaComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar',/* 'c_codigo_tipo_medida', */ 'c_nombre_tipo_medida', 'c_descripcion_tipo_medida', 'eliminar'];
  public tablaTipoMedida!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    override snackBar: MatSnackBar,
    public tipoMedidaService:TipoMedidaService,
    public dialog: MatDialog,
    ) { super(snackBar)}

  override ngOnInit(): void {
    this.getTipoMedida();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaTipoMedida.filter = dato.trim().toLowerCase();
  }

  getTipoMedida(){
    this.tipoMedidaService.getTipoMedida({},{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.tablaTipoMedida = new MatTableDataSource<any>(res.body.response1);
        this.tablaTipoMedida.paginator = this.paginator;
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  editarTipoMedida(valor:any){
    const dialogRef = this.dialog.open(EditTipoMedidaComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { valor: valor}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.getTipoMedida();

      } catch (error) {
        ////console.log(error);
        this.getTipoMedida();
      }
    });
  }

  eliminar(valor:any){
    ////console.log("valor => e ", valor);
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el tipo de medida " + valor.c_nombre_tipo_medida + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTipoMedida(valor);
      }
    });
  }

  deleteTipoMedida(valor:any){
    let parametro = {
      n_id_tipo_medida: valor.n_id_tipo_medida
    }
    ////console.log("parametro => ", parametro);
    
    this.tipoMedidaService.deleteTipoMedida(parametro,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.getTipoMedida();
        this.openSnackBar("ELIMINADO CORRECTAMENTE", 2500);
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }


}
