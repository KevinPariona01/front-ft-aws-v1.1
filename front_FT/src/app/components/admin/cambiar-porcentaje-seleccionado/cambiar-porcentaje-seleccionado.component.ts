import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CambioPorcentajeXGrupoService } from 'src/app/service/cambio-porcentaje-xgrupo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cambiar-porcentaje-seleccionado',
  templateUrl: './cambiar-porcentaje-seleccionado.component.html',
  styleUrls: ['./cambiar-porcentaje-seleccionado.component.css']
})
export class CambiarPorcentajeSeleccionadoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['c_nombre_grupo','c_nombre_distribucion_tipo_medida', 'f_valor_porcentaje', 'f_valor_porcentaje_max', 'f_valor_porcentaje_min'];
  public tablaGrupos!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  n_id_grupo:any = null;

  constructor(
    override snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CambiarPorcentajeSeleccionadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cambioPorcentajeXGrupoService:CambioPorcentajeXGrupoService,
    ) { super(snackBar)}

  override ngOnInit(): void {
    //console.log("data => ", this.data);
    this.n_id_grupo = this.data.grupo;
    this.getGrupoXPorcentaje();
  }

  getGrupoXPorcentaje(){
    let parametro = {
      n_id_grupo: this.n_id_grupo
    }
    this.cambioPorcentajeXGrupoService.getGrupoXPorcentaje(parametro,{}).subscribe( res => {
      if(res.status){
        this.tablaGrupos = new MatTableDataSource<any>(res.body.response1);
        this.tablaGrupos.paginator = this.paginator;
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  CambiarPorcentajeGrupal(valor:any){
    //console.log("n_id_distribucion_tipo_medida => ", valor);
    
    let parametro = {
      n_id_grupo: this.n_id_grupo,
      lista_productos :this.data.productos,
      n_id_distribucion_tipo_medida: valor.n_id_distribucion_tipo_medida,
      f_valor_porcentaje: valor.f_valor_porcentaje
    }
    //console.log("parametro => ", parametro);
    
    this.cambioPorcentajeXGrupoService.CambiarPorcentajeGrupal(parametro,{}).subscribe( res => {
      //console.log("res =>" , res);
      if(res.status){
        
        this.openSnackBar("CAMBIO CORRECTAMENTE", 2500);
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

}
