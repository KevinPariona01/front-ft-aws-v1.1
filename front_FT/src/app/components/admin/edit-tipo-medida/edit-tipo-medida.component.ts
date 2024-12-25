import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoMedida } from 'src/app/interface/tipo_medida.interface';
import { BaseComponent } from '../../generico/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoMedidaService } from 'src/app/service/tipo-medida.service';

@Component({
  selector: 'app-edit-tipo-medida',
  templateUrl: './edit-tipo-medida.component.html',
  styleUrls: ['./edit-tipo-medida.component.css']
})
export class EditTipoMedidaComponent extends BaseComponent implements OnInit {

  tipoMedida!: TipoMedida;
  editar:boolean=false;

  constructor(
    override snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditTipoMedidaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tipoMedidaService:TipoMedidaService,
    ) { super(snackBar)}

  override ngOnInit(): void {
    ////console.log("data => ", this.data);
    
    this.activarEditar(this.data.valor);
  }

  inicializar(){
    this.tipoMedida = {
      n_id_tipo_medida:0,
      c_codigo_tipo_medida:'',
      c_nombre_tipo_medida:'',
      c_descripcion_tipo_medida:''
    }
  }

  activarEditar(data:TipoMedida){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.tipoMedida = data;
      this.editar=true;
    }
  }

  saveTipoMedida(){
    this.tipoMedidaService.saveTipoMedida(this.tipoMedida,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        this.cerrar();
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  updateTipoMedida(){
    this.tipoMedidaService.updateTipoMedida(this.tipoMedida,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.openSnackBar("ACTUALIZADO CORRECTAMENTE", 2500);
        this.cerrar();
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  guardar(){
    ////console.log("tipo medida => ", this.tipoMedida);
    if(this.editar){
      this.updateTipoMedida();
    }else{
      this.saveTipoMedida();
    }
  }

  cerrar(){
    this.dialogRef.close({flag: false, data: null})
  }

}
