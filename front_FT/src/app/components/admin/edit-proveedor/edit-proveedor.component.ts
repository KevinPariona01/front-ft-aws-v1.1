import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proveedor } from 'src/app/interface/proveedor.interface';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { BaseComponent } from '../../generico/base/base.component';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.css']
})
export class EditProveedorComponent extends BaseComponent implements OnInit {

  proveedor!: Proveedor;
  editar:boolean=false;

  constructor(
    override snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public proveedorService:ProveedorService,
  ) { super(snackBar) }

  override ngOnInit(): void {
    this.activarEditar(this.data.valor);
  }

  inicializar(){
    this.proveedor = {
      n_id_proveedor: 0,
      c_descripcion_proveedor: '',
      c_nombre_proveedor: '',
      c_numero_proveedor: '',
      c_ruc_proveedor: ''
    }
  }

  activarEditar(data:Proveedor){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.proveedor = data;
      this.editar=true;
    }
  }

  saveProveedor(){
    this.proveedorService.saveProveedor(this.proveedor,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        this.cerrar();
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  updateProveedor(){
    this.proveedorService.updateProveedor(this.proveedor,{}).subscribe( res => {
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
    ////console.log("tipo medida => ", this.grupo);
    if(this.editar){
      this.updateProveedor();
    }else{
      this.saveProveedor();
    }
  }

  cerrar(){
    this.dialogRef.close({flag: false, data: null})
  }

}
