import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { Producto } from 'src/app/interface/producto.interface';
import { ExcelProductoService } from 'src/app/service/excel-producto.service';
import { GrupoService } from 'src/app/service/grupo.service';
import { ProductoService } from 'src/app/service/producto.service';
import { BaseComponent } from '../../generico/base/base.component';
import { ConfirmComponent } from '../../generico/confirm/confirm.component';
import { CambiarPorcentajeSeleccionadoComponent } from '../cambiar-porcentaje-seleccionado/cambiar-porcentaje-seleccionado.component';
import { EditProductoComponent } from '../edit-producto/edit-producto.component';
import * as JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = [ 'editar', 'check',/* 'c_codigo_tipo_medida', */ 'c_nombre_producto', 'c_descripcion_producto', 'f_precio_producto', 'c_nombre_tipo_medida',/*  'c_nombre_grupo',  */'eliminar'];
  public tablaProducto!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  myControl = new FormControl();
  lista_grupos:any = [];
  lista_proveedores:any = [];
  filteredOptions!: Observable<any[]>;

  n_id_grupo:any = null;
  
  lista_productos_seleccionado:any = [];
  lista_productos:any = [];

  @ViewChild('barcode') barcode!: ElementRef<SVGElement>;
  @ViewChild('scannerInput') scannerInput!: ElementRef<HTMLInputElement>;
  @ViewChild('barcodeCanvas', { static: false })
  barcodeCanvas!: ElementRef<HTMLCanvasElement>;
  



  constructor(
    override snackBar: MatSnackBar,
    public productoService:ProductoService,
    public grupoService:GrupoService,
    public dialog: MatDialog,
    public excelProductoService: ExcelProductoService,
    ) { super(snackBar)
      }

  override ngOnInit(): void {
    this.getProducto();
    this.getGrupo();
    
  }

  generarBarcode(codigo: string): string {
  const canvas = this.barcodeCanvas.nativeElement;

  JsBarcode(canvas, codigo, {
    format: 'CODE128',
    width: 2,
    height: 60,
    displayValue: true,
    fontSize: 14,
    margin: 5
  });

  return canvas.toDataURL('image/png');
}

public exportarPdf() {
  const pdf = new jsPDF('p', 'mm', 'a4');

  // 📄 Página
  const pageWidth = 210;

  // 📐 Celda
  const cellWidth = 40;
  const cellHeight = 34;

  // 🏷️ Código de barras
  const barcodeWidth = 36;
  const barcodeHeight = 18;

  // 🔢 Grid
  const cols = 5;
  const rows = 9;

  // 📏 Centramos la grilla
  const gridWidth = cellWidth * cols;
  const startX = (pageWidth - gridWidth) / 2;
  const startY = 10;

  let x = startX;
  let y = startY;

  this.lista_productos.forEach((prod: any, index: number) => {
    const img = this.generarBarcode(prod.c_codigo_producto);

    // 🟦 Borde de la celda
    pdf.rect(x, y, cellWidth, cellHeight);

    // 📌 Barcode centrado
    const imgX = x + (cellWidth - barcodeWidth) / 2;
    const imgY = y + 4;
    pdf.addImage(img, 'PNG', imgX, imgY, barcodeWidth, barcodeHeight);

    // 📝 Textos
    pdf.setFontSize(8);
    pdf.text(
      prod.c_nombre_producto ?? '',
      x + cellWidth / 2,
      y + cellHeight - 8,
      {
        align: 'center',
        maxWidth: cellWidth - 4
      }
    );

    pdf.setFontSize(7);
    pdf.text(
      prod.c_detalle_primario_producto ?? '',
      x + cellWidth / 2,
      y + cellHeight - 4,
      {
        align: 'center',
        maxWidth: cellWidth - 4
      }
    );

    // ➡️ Siguiente columna
    x += cellWidth;

    // ⬇️ Nueva fila
    if ((index + 1) % cols === 0) {
      x = startX;
      y += cellHeight;
    }

    // 📄 Nueva página
    if (
      (index + 1) % (cols * rows) === 0 &&
      index + 1 < this.lista_productos.length
    ) {
      pdf.addPage();
      x = startX;
      y = startY;
    }
  });

  pdf.save('codigos-de-barras.pdf');
}


  displayFn(user: any): string {
    return user && user.c_nombre_grupo ? user.c_nombre_grupo : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.lista_grupos.filter((option:any) => option.c_nombre_grupo.toLowerCase().includes(filterValue));
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaProducto.filter = dato.trim().toLowerCase();
  }
  
  clearCampo(){
    this.myControl.reset();
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

  getProducto(){
    let parametro = {
      n_id_grupo: this.n_id_grupo
    }
    ////console.log("parametro => ", parametro);
    this.productoService.getProducto(parametro,{}).subscribe( res => {
      
      this.lista_productos_seleccionado = [];
      if(res.status){
        this.tablaProducto = new MatTableDataSource<any>(res.body.response1);
        this.tablaProducto.paginator = this.paginator;
        this.lista_productos = res.body.response1;
        
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  editarProducto(valor:any){
    const dialogRef = this.dialog.open(EditProductoComponent, {
      panelClass: 'custom-dialog-container',
      width: '90vw',
      maxHeight: '95vh',
      data: { valor: valor, n_id_grupo: this.n_id_grupo}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.getProducto();
        
        this.lista_productos_seleccionado = [];
      } catch (error) {
        ////console.log(error);
        this.getProducto();
      }
    });
  }

  eliminar(valor:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el producto " + valor.c_nombre_producto +  " - " + valor.c_detalle_primario_producto + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProducto(valor);
        
        this.lista_productos_seleccionado = [];
      }
    });
  }

  deleteProducto(valor:any){
    let parametro = {
      n_id_producto: valor.n_id_producto
    }
    ////console.log("parametro => ", parametro);
    
    this.productoService.deleteProducto(parametro,{}).subscribe( res => {
      ////console.log("res => ", res);
      if(res.status){
        this.getProducto();
        this.openSnackBar("ELIMINADO CORRECTAMENTE", 2500);
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  seleccionarGrupo(grupo:any){
    ////console.log("grupo => ", grupo);
    this.n_id_grupo = grupo;
    this.getProducto();
    this.lista_productos_seleccionado = [];
  }

  cambiarPorcentajeSeleccionado(){
    const dialogRef = this.dialog.open(CambiarPorcentajeSeleccionadoComponent, {
      panelClass: 'custom-dialog-container',
      width: '90vw',
      maxHeight: '95vh',
      data: { 
        productos: this.lista_productos_seleccionado,
        grupo: this.n_id_grupo
      }
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.getProducto();
        this.lista_productos_seleccionado = [];
      } catch (error) {
        ////console.log(error);
        this.getProducto();
      }
    });
  }


  asignar(element:any){
    if (element.check){
      // El checkbox está marcado
      //console.log("Checkbox marcado" , element.n_id_producto);
      this.lista_productos_seleccionado.push(element.n_id_producto);
      //console.log("Array: " , this.lista_productos_seleccionado);
    } else {
      // El checkbox no está marcado
      //console.log("Checkbox no marcado" , element.n_id_producto);
      this.lista_productos_seleccionado = this.lista_productos_seleccionado.filter((elemento:any) => elemento !== element.n_id_producto);
      //console.log("Array: " , this.lista_productos_seleccionado);
    }
  }

  getProductoExportar(){
    let parametro = {
      n_id_grupo: this.n_id_grupo
    }
    this.productoService.getProducto(parametro,{}).subscribe( res => {
      if(res.status){
        this.exportar(res.body.response1);
        this.tablaProducto.paginator = this.paginator;
        
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  
  exportar(lista: Producto[]){
    this.excelProductoService.exportarProducto(lista).subscribe((res)=>{
    });
  }

}
