import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { Grupo } from 'src/app/interface/grupo.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GrupoService } from 'src/app/service/grupo.service';

@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.css']
})
export class EditGrupoComponent extends BaseComponent implements OnInit {

  grupo!: Grupo;
  editar:boolean=false;

  constructor(
    override snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public grupoService:GrupoService,
    ) { super(snackBar) }

  override ngOnInit(): void {
    ////console.log("data => ", this.data);
    
    this.activarEditar(this.data.valor);
  }

  inicializar(){
    this.grupo = {
      n_id_grupo: 0,
      c_codigo_grupo: '',
      c_nombre_grupo: '',
      c_descripcion_grupo: '',
      c_ruta_img: ''
    }
  }

  activarEditar(data:Grupo){
    if(data==null){
      this.inicializar();
      this.editar=false;
    }else{
      this.grupo = data;
      this.editar=true;
    }
  }

  saveGrupo(){
    this.grupoService.saveGrupo(this.grupo,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        this.cerrar();
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  updateGrupo(){
    this.grupoService.updateGrupo(this.grupo,{}).subscribe( res => {
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
      this.updateGrupo();
    }else{
      this.saveGrupo();
    }
  }

  cerrar(){
    this.dialogRef.close({flag: false, data: null})
  }

  editNomArchivo:boolean = true;
  file!:any;
  checksums:any = [];

  uploadfile = async (files: any) =>{
    for(let i = 0; i < files.target.files.length; i++){
      this.file = files.target.files.item(i);     
      this.uploadFileToActivity();
    }
    this.editNomArchivo = false; 
  }

  uploadFileToActivity(){
    let extension = this.file.name;
    this.grupoService.uploadfile(extension, this.grupo.n_id_grupo+"_ID", this.file).subscribe(
      (result:any) => {
        if (result.estado) {
          //console.log("response data => ", result);
          
          this.checksums.push(result.c_checksum);    
          this.grupo.c_ruta_img = result.c_ruta;
        } else {
          this.openSnackBar(result.mensaje, 2500);
        }
      }, error => {
        this.openSnackBar(<any>error, 2500);
        alert(error.error);
        //console.log(error);
      });
  }

}
