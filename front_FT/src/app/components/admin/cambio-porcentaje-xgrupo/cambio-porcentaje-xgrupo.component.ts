import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CambioPorcentajeXGrupoService } from 'src/app/service/cambio-porcentaje-xgrupo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { GrupoService } from 'src/app/service/grupo.service';

@Component({
  selector: 'app-cambio-porcentaje-xgrupo',
  templateUrl: './cambio-porcentaje-xgrupo.component.html',
  styleUrls: ['./cambio-porcentaje-xgrupo.component.css']
})
export class CambioPorcentajeXGrupoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['c_nombre_grupo','c_nombre_distribucion_tipo_medida', 'f_valor_porcentaje', 'f_valor_porcentaje_max', 'f_valor_porcentaje_min'];
  public tablaGrupos!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  myControl = new FormControl();
  lista_grupos:any = [];
  filteredOptions!: Observable<any[]>;
  n_id_grupo:any = null;

  constructor(
    override snackBar: MatSnackBar,
    public cambioPorcentajeXGrupoService: CambioPorcentajeXGrupoService,
    public dialog: MatDialog,
    public grupoService:GrupoService,
  ){ super(snackBar)}

  override ngOnInit(): void {
    this.getGrupoXPorcentaje();
    this.getGrupo();
  }
  
  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaGrupos.filter = dato.trim().toLowerCase();
  }

  displayFn(user: any): string {
    return user && user.c_nombre_grupo ? user.c_nombre_grupo : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.lista_grupos.filter((option:any) => option.c_nombre_grupo.toLowerCase().includes(filterValue));
  }

  getGrupo(){
    this.grupoService.getGrupo({},{}).subscribe( res => {
      if(res.status){
        this.lista_grupos = res.body.response1;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.c_nombre_grupo;
            return name ? this._filter(name as string) : this.lista_grupos.slice();
          }),
        );
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  getGrupoXPorcentaje(){
    let parametro = {
      n_id_grupo: this.n_id_grupo
    }
    this.cambioPorcentajeXGrupoService.getGrupoXPorcentaje(parametro,{}).subscribe( res => {
      ////console.log("res => ", res);
      
      if(res.status){
        this.tablaGrupos = new MatTableDataSource<any>(res.body.response1);
        this.tablaGrupos.paginator = this.paginator;
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  cambiarPorcentaje(element:any){
    ////console.log("element => ", element);
    let parametro = {
      n_id_distribucion_tipo_medida: element.n_id_distribucion_tipo_medida,
      n_id_grupo: element.n_id_grupo,
      f_valor_porcentaje: element.f_valor_porcentaje
    }
    this.cambioPorcentajeXGrupoService.updatePorcetanejeXGrupo(parametro,{}).subscribe( res => {
      if(res.status){
        this.getGrupoXPorcentaje();
        this.openSnackBar("ACTUALIZADO CORRECTAMENTE", 2500);
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });

  }

  clearCampo(){
    this.myControl.reset();
  }

  seleccionarGrupo(grupo:any){
    ////console.log("grupo => ", grupo);
    this.n_id_grupo = grupo;
    this.getGrupoXPorcentaje();
  }


}
