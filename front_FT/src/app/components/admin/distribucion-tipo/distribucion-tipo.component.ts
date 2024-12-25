import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { DistribucionTipoService } from 'src/app/service/distribucion-tipo.service';
import { TipoMedidaService } from 'src/app/service/tipo-medida.service';
import { BaseComponent } from '../../generico/base/base.component';
import { ConfirmComponent } from '../../generico/confirm/confirm.component';
import { EditDistribucionTipoComponent } from '../edit-distribucion-tipo/edit-distribucion-tipo.component';

@Component({
  selector: 'app-distribucion-tipo',
  templateUrl: './distribucion-tipo.component.html',
  styleUrls: ['./distribucion-tipo.component.css']
})
export class DistribucionTipoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar',/* 'c_codigo_tipo_medida', */ 'c_nombre_distribucion_tipo_medida', 'c_nombre_tipo_medida', 'f_distribucion_tipo_medida', 'c_descripcion_distribucion_tipo_medida', 'n_orden','eliminar'];
  public tablaDistribucionTipoMedida!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  myControl = new FormControl();
  lista_tipo_medidas:any = [];
  filteredOptions!: Observable<any[]>;
  n_id_tipo_medida:any = null;

  constructor(
    override snackBar: MatSnackBar,
    public distribucionTipoService:DistribucionTipoService,
    public dialog: MatDialog,
    public tipoMedidaService:TipoMedidaService,
    ) { super(snackBar)}

  override ngOnInit(): void {
    this.getDistribucionTipoMedida();
    this.getTipoMedida();
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaDistribucionTipoMedida.filter = dato.trim().toLowerCase();
  }

  displayFn(user: any): string {
    return user && user.c_nombre_tipo_medida ? user.c_nombre_tipo_medida : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.lista_tipo_medidas.filter((option:any) => option.c_nombre_tipo_medida.toLowerCase().includes(filterValue));
  }

  getTipoMedida(){
    this.tipoMedidaService.getTipoMedida({},{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.lista_tipo_medidas = res.body.response1;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.c_nombre_tipo_medida;
            return name ? this._filter(name as string) : this.lista_tipo_medidas.slice();
          }),
        );
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  getDistribucionTipoMedida(){
    let parametro = {
      n_id_tipo_medida: this.n_id_tipo_medida
    }
    this.distribucionTipoService.getDistribucionTipoMedida(parametro,{}).subscribe( res => {
      ////console.log("res d => ", res);
      ////console.log("res s => ", res.status);
      if(res.status){
        this.tablaDistribucionTipoMedida = new MatTableDataSource<any>(res.body.response1);
        this.tablaDistribucionTipoMedida.paginator = this.paginator;
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  editarTipoMedida(valor:any){
    const dialogRef = this.dialog.open(EditDistribucionTipoComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { valor: valor}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.getDistribucionTipoMedida();

      } catch (error) {
        ////console.log(error);
        this.getDistribucionTipoMedida();
      }
    });
  }

  eliminar(valor:any){
    ////console.log("valor => e ", valor);
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la distribucion " + valor.c_nombre_distribucion_tipo_medida + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTipoMedida(valor);
      }
    });
  }

  deleteTipoMedida(valor:any){
    let parametro = {
      n_id_distribucion_tipo_medida: valor.n_id_distribucion_tipo_medida
    }
    ////console.log("parametro => ", parametro);
    
    this.distribucionTipoService.deleteDistribucionTipoMedida(parametro,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.getDistribucionTipoMedida();
        this.openSnackBar("ELIMINADO CORRECTAMENTE", 2500);
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  cambiarOrdenDistribucionTipoMedida(element:any){
    this.distribucionTipoService.cambiarOrdenDistribucionTipoMedida(element,{}).subscribe( res => {
      ////console.log("res => ", res);
      
      if(res.status){
        this.openSnackBar("ACTUALIZADO CORRECTAMENTE", 2500);
        this.getDistribucionTipoMedida();
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  clearCampo(){
    this.myControl.reset();
  }

  seleccionarTipoMedida(tipo_medida:any){
    //console.log("grupo => ", tipo_medida);
    this.n_id_tipo_medida = tipo_medida;
    this.getDistribucionTipoMedida();
  }

}
