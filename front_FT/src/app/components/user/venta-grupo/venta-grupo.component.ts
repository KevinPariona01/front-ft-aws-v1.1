import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrupoService } from 'src/app/service/grupo.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-venta-grupo',
  templateUrl: './venta-grupo.component.html',
  styleUrls: ['./venta-grupo.component.css']
})
export class VentaGrupoComponent extends BaseComponent implements OnInit {

  public listado_grupo:any =  []
  listaOriginal: any[] = [];
  rutaBackendArchivo = '';

  constructor(
    override snackBar: MatSnackBar,
    public grupoService: GrupoService,
    public dialog: MatDialog,
    public router: Router,
  ){ super(snackBar)
    this.rutaBackendArchivo = environment.archivosGrupo;}

  override ngOnInit(): void {
    this.getGrupo();
  }
  
  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    /* this.listado_grupo = dato.trim().toLowerCase(); */
    if(dato!==''){
        this.listado_grupo = this.listado_grupo.filter((item: any) =>
        item.c_nombre_grupo.toLowerCase().includes(dato.toLowerCase())
      );
    }else{
      this.listado_grupo = this.listaOriginal;
    }
    
  }

  getGrupo(){
    this.grupoService.getGrupo({},{}).subscribe( res => {
      ////console.log("res => ", res);
      
      if(res.status){
        this.listado_grupo = res.body.response1;
        this.listaOriginal = this.listado_grupo;
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  irAProductos(g:any){    
    ////console.log("grupos => ", g);
    this.router.navigate([`venta-producto/${g.n_id_grupo}`]);
  } 

}
