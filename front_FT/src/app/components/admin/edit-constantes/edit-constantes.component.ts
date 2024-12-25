import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { Constante } from 'src/app/interface/constante.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConstantesService } from 'src/app/service/constantes.service';

@Component({
  selector: 'app-edit-constantes',
  templateUrl: './edit-constantes.component.html',
  styleUrls: ['./edit-constantes.component.css']
})
export class EditConstantesComponent extends BaseComponent implements OnInit {

  constante!: Constante;
  editar:boolean=false;

  constructor(
    override snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditConstantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public constantesService:ConstantesService,
    ) { super(snackBar)}

  override ngOnInit(): void {
    this.activarEditar(this.data.valor);
  }

  inicializar(){
    this.constante = {
      c_valor_id_constante: '',
      c_valor_constante: '',
      c_descripcion_constante: '',
    }
  }

  activarEditar(data:Constante){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.constante = data;
      this.editar=true;
    }
  }

  saveConstante(){
    this.constantesService.saveConstante(this.constante,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        this.cerrar();
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  updateConstante(){
    this.constantesService.updateConstante(this.constante,{}).subscribe( res => {
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
    ////console.log("tipo medida => ", this.constante);
    if(this.editar){
      this.updateConstante();
    }else{
      this.saveConstante();
    }
  }

  cerrar(){
    this.dialogRef.close({flag: false, data: null})
  }

}
