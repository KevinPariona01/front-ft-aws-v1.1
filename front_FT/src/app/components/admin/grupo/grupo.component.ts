import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrupoService } from 'src/app/service/grupo.service';
import { MatTableDataSource } from '@angular/material/table';
import { EditGrupoComponent } from '../edit-grupo/edit-grupo.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../generico/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent extends BaseComponent implements OnInit {

  @ViewChild('tooltipTemplate') tooltipTemplate!: TemplateRef<any>;
  
  displayedColumns: string[] = ['editar','c_nombre_grupo', 'c_descripcion_grupo', 'n_orden', 'imagen', 'eliminar'];
  public tablaGrupo!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  rutaBackendArchivo = '';

  constructor(
    override snackBar: MatSnackBar,
    public grupoService: GrupoService,
    public dialog: MatDialog,
    
  ){ super(snackBar)
    this.rutaBackendArchivo = environment.archivosGrupo;
  }

  override ngOnInit(): void {
    this.getGrupo();
  }

  
  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaGrupo.filter = dato.trim().toLowerCase();
  }

  getGrupo(){
    this.grupoService.getGrupo({},{}).subscribe( res => {
      
      if(res.status){
        this.tablaGrupo = new MatTableDataSource<any>(res.body.response1);
        this.tablaGrupo.paginator = this.paginator;
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  editarGrupo(valor:any){
    const dialogRef = this.dialog.open(EditGrupoComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { valor: valor}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.getGrupo();

      } catch (error) {
        ////console.log(error);
        this.getGrupo();
      }
    });
  }

  eliminar(valor:any){
    ////console.log("valor => e ", valor);
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el grupo " + valor.c_nombre_grupo + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGrupo(valor);
      }
    });
  }

  deleteGrupo(valor:any){
    let parametro = {
      n_id_grupo: valor.n_id_grupo
    }
    ////console.log("parametro => ", parametro);
    
    this.grupoService.deleteGrupo(parametro,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.getGrupo();
        this.openSnackBar("ELIMINADO CORRECTAMENTE", 2500);
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  cambiarOrdenGrupo(element:any){
    this.grupoService.cambiarOrdenGrupo(element,{}).subscribe( res => {
      ////console.log("res => ", res);
      
      if(res.status){
        this.openSnackBar("ACTUALIZADO CORRECTAMENTE", 2500);
        this.getGrupo();
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  getTooltipContent(element: any): TemplateRef<any> {
    return this.tooltipTemplate;
  }

}
