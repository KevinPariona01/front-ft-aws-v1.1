import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConstantesService } from 'src/app/service/constantes.service';
import { MatDialog } from '@angular/material/dialog';
import { EditConstantesComponent } from '../edit-constantes/edit-constantes.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-constantes',
  templateUrl: './constantes.component.html',
  styleUrls: ['./constantes.component.css']
})
export class ConstantesComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','c_valor_id_constante', 'c_valor_constante', 'c_descripcion_constante'];
  public tablaConstantes!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    override snackBar: MatSnackBar,
    public ConstantesService: ConstantesService,
    public dialog: MatDialog,
  ){ super(snackBar)}

  override ngOnInit(): void {
    this.getConstantes();
  }
  
  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaConstantes.filter = dato.trim().toLowerCase();
  }

  getConstantes(){
    this.ConstantesService.getConstantes({},{}).subscribe( res => {
      ////console.log("res => ", res);
      
      if(res.status){
        this.tablaConstantes = new MatTableDataSource<any>(res.body.response1);
        this.tablaConstantes.paginator = this.paginator;
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  editarConstante(valor:any){
    const dialogRef = this.dialog.open(EditConstantesComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { valor: valor}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.getConstantes();

      } catch (error) {
        ////console.log(error);
        this.getConstantes();
      }
    });
  }


}
