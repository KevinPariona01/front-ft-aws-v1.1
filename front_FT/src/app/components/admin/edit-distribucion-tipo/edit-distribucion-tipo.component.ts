import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DistribucionTipoService } from 'src/app/service/distribucion-tipo.service';
import { DistribucionTipoMedida } from 'src/app/interface/distribucion_tipo_medida.interface';
import { TipoMedidaService } from 'src/app/service/tipo-medida.service';

@Component({
  selector: 'app-edit-distribucion-tipo',
  templateUrl: './edit-distribucion-tipo.component.html',
  styleUrls: ['./edit-distribucion-tipo.component.css']
})
export class EditDistribucionTipoComponent extends BaseComponent implements OnInit {

  distribucionTipoMedida!: DistribucionTipoMedida;
  editar:boolean=false;
  listaTipoMedida:any = [];

  constructor(
    override snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditDistribucionTipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public distribucionTipoService:DistribucionTipoService,
    public tipoMedidaService:TipoMedidaService,
    ) { super(snackBar)}

    override ngOnInit(): void {
      ////console.log("data => ", this.data);
      this.activarEditar(this.data.valor);
    }

    getTipoMedida(){
      this.tipoMedidaService.getTipoMedida({},{}).subscribe( res => {
        ////console.log("res => ", res);
        if(res.status){
          this.listaTipoMedida = res.body.response1;
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }
  
    inicializar(){
      this.distribucionTipoMedida = {
        n_id_distribucion_tipo_medida:0,
        n_id_tipo_medida:0,
        c_nombre_distribucion_tipo_medida:'',
        f_distribucion_tipo_medida:0,
        c_descripcion_distribucion_tipo_medida:'',
      }
    }

    activarEditar(data:DistribucionTipoMedida){
      this.getTipoMedida();
      if(data==null){
        this.inicializar();
        this.editar=false;
      }else{
        this.distribucionTipoMedida = data;
        this.editar=true;
      }
    }

    selecctionarTipoMedida(valor:any){
      this.distribucionTipoMedida.n_id_tipo_medida = valor;
    }

    guardar(){
      ////console.log("tipo medida => ", this.distribucionTipoMedida);
      if(this.editar){
        this.updateDistribucionTipoMedida();
      }else{
        this.saveDistribucionTipoMedida();
      }
    }

    saveDistribucionTipoMedida(){
      this.distribucionTipoService.saveDistribucionTipoMedida(this.distribucionTipoMedida,{}).subscribe( res => {
        ////console.log("res => ", res);
        if(res.status){
          this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
          this.cerrar();
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }
  
    updateDistribucionTipoMedida(){
      this.distribucionTipoService.updateDistribucionTipoMedida(this.distribucionTipoMedida,{}).subscribe( res => {
        ////console.log("res => ", res);
        if(res.status){
          this.openSnackBar("ACTUALIZADO CORRECTAMENTE", 2500);
          this.cerrar();
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    cerrar(){
      this.dialogRef.close({flag: false, data: null})
    }


}
