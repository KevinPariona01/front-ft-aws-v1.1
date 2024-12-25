import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Security } from 'src/app/interface/security.interface';
import { SecurityService } from 'src/app/service/security.service';
import { BaseComponent } from '../../generico/base/base.component';

@Component({
  selector: 'app-form-credential',
  templateUrl: './form-credential.component.html',
  styleUrls: ['./form-credential.component.css']
})
export class FormCredentialComponent extends BaseComponent implements OnInit {

  security!: Security;

  constructor(
    private dialogRef: MatDialogRef<FormCredentialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public securityService:SecurityService,
    override snackBar: MatSnackBar,
  ) { super(snackBar) }

  override ngOnInit(): void {
    this.inicializar();
  }

  inicializar(){
    this.security = {
      c_user:'',
      c_password:''
    }
  }

  validateCredentials(){
    this.securityService.validateCredentials(this.security,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        if(res.body.response1.length > 0){
          this.securityService.isAdmin = true;
          this.openSnackBar("CREDENCIALES CORRECTAS CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("DATOS ERRONEOS", 2500);
        }
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
