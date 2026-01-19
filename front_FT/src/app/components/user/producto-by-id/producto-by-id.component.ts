import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/service/producto.service';
import { BaseComponent } from '../../generico/base/base.component';
import * as JsBarcode from 'jsbarcode';
import { MatDialog } from '@angular/material/dialog';
import { VentaProductoDetalleComponent } from '../venta-producto-detalle/venta-producto-detalle.component';
import { VentaMomentoService } from 'src/app/service/venta-momento.service';

@Component({
  selector: 'app-producto-by-id',
  templateUrl: './producto-by-id.component.html',
  styleUrls: ['./producto-by-id.component.css']
})
export class ProductoByIdComponent extends BaseComponent implements OnInit {

  listProductos:any = [];
  total:number = 0;
  //REFERENCIAS AL HTML
    @ViewChild('barcode') barcode!: ElementRef<SVGElement>;
    @ViewChild('scannerInput') scannerInput!: ElementRef<HTMLInputElement>;
    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  constructor(
    override snackBar: MatSnackBar,
    public productoService: ProductoService,
    public dialog: MatDialog,
    public ventaMomentoService: VentaMomentoService,
  ) { super(snackBar) }

  override ngOnInit(): void {
  }

  ngAfterViewInit() {
      // Generar el código de barras
      JsBarcode(this.barcode.nativeElement, 'PRD000026', {
        format: 'CODE128',
        width: 2,
        height: 50,
        displayValue: true
      });
      this.enfocarInput();
    }

  //   private enfocarInput() {
  //   setTimeout(() => {
  //     this.searchInput.nativeElement.focus();
  //   }, 0);
  // }

  private enfocarInput() {
  setTimeout(() => {
    const activeElement = document.activeElement as HTMLElement;

    // Si ya hay un input o textarea enfocado, no forzar foco
    if (
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
       activeElement.tagName === 'TEXTAREA')
    ) {
      return;
    }

    this.searchInput.nativeElement.focus();
  }, 0);
}

  getPedidoProductoById(valor:any){
  let parametro = {
    c_codigo_producto: valor
  }
  let audio = new Audio();
  this.productoService.getPedidoProductoById(parametro,{}).subscribe( res => {
    if(res.status){

      let producto : any[] = res.body.response1;
      console.log("producto: " + JSON.stringify(producto));

      if(producto != null && producto.length > 0){

        const productoNuevo = producto[0];

        console.log(productoNuevo.n_id_producto);
        const existe = this.listProductos.some(
          (p: any) => p.n_id_producto === productoNuevo.n_id_producto
        );

        if(existe){
          this.openSnackBar("El producto ya está incluido", 2500);
          this.soundError();
          return;
        }

        this.listProductos = [...this.listProductos, productoNuevo];
        audio.src = 'assets/1.mp3';
        audio.play();
        this.verDetalle(productoNuevo);

      }else{
        this.soundError();
        this.openSnackBar("No se encontró producto", 2500);
      }

    }else{
      this.soundError();
      this.openSnackBar("OCURRIÓ ALGO", 2500);
    }
  });
}

private soundError(){
  let audio = new Audio();
  audio.src = 'assets/2.mp3';
  audio.play();
}

  onEnter(input: HTMLInputElement) {
    const valor = input.value;

    console.log('VALOR CAPTURADO:', valor.toUpperCase());
    this.getPedidoProductoById(valor.toUpperCase());
    input.value = '';
  }

  @HostListener('document:click')
  @HostListener('document:keydown')
  mantenerFocus() {
    this.enfocarInput();
  }

  verDetalle(valor:any){
    const dialogRef = this.dialog.open(VentaProductoDetalleComponent, {
      panelClass: 'custom-dialog-container',
      width: '95vw',
      maxHeight: '95vh',
      data: { valor: valor}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      this.obtenerTotal();
    });
}



eliminarProducto(g:any){
  ////console.log("producto => ", g);
  this.ventaMomentoService.producotsVenta = this.ventaMomentoService.producotsVenta.filter( r => r.id !== g.id);
  this.total = 0;
  this.obtenerTotal();
}

obtenerTotal(){
  this.total = 0;
    this.ventaMomentoService.producotsVenta.forEach( v => {
      this.total = parseFloat(v.valor)*parseFloat(v.repeticiones) + this.total;
      this.total = (Number)((this.total).toFixed(2));
    });
  }

  actualizarMonto(){
    this.total = 0;
    this.obtenerTotal();
  }

  borrarVenta(){
    this.ventaMomentoService.producotsVenta = [];
    this.ventaMomentoService.id =0;
    this.total = 0;
  }

}
