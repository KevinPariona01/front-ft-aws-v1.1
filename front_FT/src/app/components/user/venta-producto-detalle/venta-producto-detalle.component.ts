import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/interface/producto.interface';
import { ProductoService } from 'src/app/service/producto.service';
import { VentaMomentoService } from 'src/app/service/venta-momento.service';

@Component({
  selector: 'app-venta-producto-detalle',
  templateUrl: './venta-producto-detalle.component.html',
  styleUrls: ['./venta-producto-detalle.component.css']
})
export class VentaProductoDetalleComponent extends BaseComponent  implements OnInit {

  producto!: Producto;
  productoAsociado!: Producto;
  listado_precios:any = [];
  listado_extra:any = [];
  listado_general:any = [];

  productoAsociadoActivo:boolean = false;

  dolar:number = 0;
  igv:number = 0;

  constructor(
    override snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<VentaProductoDetalleComponent>,
    public productoService:ProductoService,
    public ventaMomentoService: VentaMomentoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    ) { super(snackBar)}

  override ngOnInit(): void {
    //console.log("producto => ", this.data.valor);
    this.inicializar();
    this.inicializarAsociado();
    this.producto = this.data.valor;
    this.obtenerValoresPrincipales();
  }

  inicializar(){
    this.producto = {
      n_id_producto: null,
      n_id_tipo_medida: 0,
      n_id_grupo: 0,
      n_id_proveedor: 0,
      c_codigo_producto: '',
      c_nombre_producto: '',
      c_detalle_primario_producto: '',
      c_descripcion_producto: '',
      f_precio_producto: 0,
      b_igv_producto: false,
      b_dolar_producto: false,
      b_par_producto: false,
      n_cantidad_viene_producto: 0,
      n_precio_por_cantidad_viene_producto: 0,
      n_id_producto_asociado: null,
      c_color: 'FFFFFF',
      nombreProductoAsociado: null,
      n_stock1: 0,
      n_stock2: 0,
      n_stock3: 0,
      c_fec_actu_stock1: '',
      c_fec_actu_stock2: '',
      c_fec_actu_stock3: '',
      n_pedido1: 0,
      n_pedido2: 0,
      n_pedido3: 0,
      c_fec_actu_pedido1: '',
      c_fec_actu_pedido2: '',
      c_fec_actu_pedido3: '',
      caseGeneric: 0,
      n_activo: 0,
      c_descripcion_pedido: ''
    }
  }

  inicializarAsociado(){
    this.productoAsociado = {
      n_id_producto: null,
      n_id_tipo_medida: 0,
      n_id_grupo: 0,
      n_id_proveedor: 0,
      c_codigo_producto: '',
      c_nombre_producto: '',
      c_detalle_primario_producto: '',
      c_descripcion_producto: '',
      f_precio_producto: 0,
      b_igv_producto: false,
      b_dolar_producto: false,
      b_par_producto: false,
      n_cantidad_viene_producto: 0,
      n_precio_por_cantidad_viene_producto: 0,
      n_id_producto_asociado: null,
      c_color: 'FFFFFF',
      nombreProductoAsociado: null,
      n_stock1: 0,
      n_stock2: 0,
      n_stock3: 0,
      c_fec_actu_stock1: '',
      c_fec_actu_stock2: '',
      c_fec_actu_stock3: '',
      n_pedido1: 0,
      n_pedido2: 0,
      n_pedido3: 0,
      c_fec_actu_pedido1: '',
      c_fec_actu_pedido2: '',
      c_fec_actu_pedido3: '',
      caseGeneric: 0,
      n_activo: 0,
      c_descripcion_pedido: ''
    }
  }

  obtenerValoresPrincipales(){
    this.dolar = parseFloat(localStorage.getItem('dolar')!);
    this.igv = parseFloat(localStorage.getItem('igv')!);
    this.getDetalleProducto();
  }

  getDetalleProducto(){
    let parametro = {
      n_id_producto : this.producto.n_id_producto,
      n_id_grupo : this.producto.n_id_grupo,
      n_id_producto_asociado: this.producto.n_id_producto_asociado
    }
    this.productoService.getDetalleProducto(parametro,{}).subscribe( res => {
      if(res.status){
        //console.log("resultados => ", res.body);
        
        this.listado_precios = this.getPrecioVentaSegunMedida(res.body.response1);
        if(this.producto.n_id_producto_asociado!==null){
          this.productoAsociado = res.body.response2[0];
          this.listado_extra = this.getPrecioVentaSegunMedidaAsociado(res.body.response3);
          this.combinar();
        }else{
          this.listado_general = this.listado_precios;
        }
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }

  getPrecioVentaSegunMedida(data:any){
    ////console.log("producto => ", this.producto);
    let precioProducto = this.producto.f_precio_producto;
    if(this.producto.b_dolar_producto){
      ////console.log("antes del dolar => ", precioProducto);
      precioProducto = precioProducto*this.dolar;
      ////console.log("precio en dolar => ", precioProducto);
    }
    if(!this.producto.b_igv_producto){
      ////console.log("antes del igv => ", precioProducto);
      precioProducto = precioProducto +precioProducto*this.igv;
      ////console.log("precio en igv => ", precioProducto);
    }
    data.map((d:any) => {
      d.f_valor_venta = parseFloat((Math.ceil((precioProducto * d.f_distribucion_tipo_medida + precioProducto * d.f_distribucion_tipo_medida * d.f_valor_porcentaje) * 10) / 10).toFixed(2));

    });
    ////console.log("datos => ", data);
    return data;
  }

  combinar(){
    this.listado_general = this.listado_precios;
    this.listado_general.map((lg:any) => {
      this.listado_extra.forEach( (le:any) => {
        if(lg.f_distribucion_tipo_medida == le.f_distribucion_tipo_medida){
          //console.log("entra => ", le.f_valor_venta);
          
          lg.f_valor_venta_asociado = le.f_valor_venta
          lg.f_precio_estatico_asociado = le.f_precio_estatico

          lg.f_valor_venta_suma = le.f_valor_venta + lg.f_valor_venta
          lg.f_precio_estatico_suma = le.f_precio_estatico + lg.f_precio_estatico

        }
      });
    });
    //console.log("listado_general => ", this.listado_general);
    
  }



  getPrecioVentaSegunMedidaAsociado(data:any){
    ////console.log("producto => ", this.producto);
    let precioProducto = this.productoAsociado.f_precio_producto;
    if(this.productoAsociado.b_dolar_producto){
      ////console.log("antes del dolar => ", precioProducto);
      precioProducto = precioProducto*this.dolar;
      ////console.log("precio en dolar => ", precioProducto);
    }
    if(!this.productoAsociado.b_igv_producto){
      ////console.log("antes del igv => ", precioProducto);
      precioProducto = precioProducto +precioProducto*this.igv;
      ////console.log("precio en igv => ", precioProducto);
    }
    data.map((d:any) => {
      d.f_valor_venta = parseFloat((Math.ceil((precioProducto * d.f_distribucion_tipo_medida + precioProducto * d.f_distribucion_tipo_medida * d.f_valor_porcentaje) * 10) / 10).toFixed(2));

    });
    ////console.log("datos => ", data);
    return data;
  }

  obtenerProductoPc(producto:any, porcentaje:any, valor:any){
    this.ventaMomentoService.id = this.ventaMomentoService.id + 1;
    let parametro = {
      id: this.ventaMomentoService.id,
      nombre: producto.c_nombre_producto,
      detalle: producto.c_detalle_primario_producto,
      cantidad: porcentaje.c_nombre_distribucion_tipo_medida,
      valor: porcentaje.f_valor_venta,
      par: this.producto.b_par_producto,
      repeticiones: 1,
    }
    ////console.log("producto nuevo => ", parametro);
    
    this.ventaMomentoService.producotsVenta.push(parametro);
    this.openSnackBar(`PRODUCTO AÑADIDO PRECIO CONPUTADORA A ${porcentaje.f_valor_venta}`, 2500);
  }

  obtenerProductoPcSuma(producto:any, porcentaje:any, valor:any){
    this.ventaMomentoService.id = this.ventaMomentoService.id + 1;
    let parametro = {
      id: this.ventaMomentoService.id,
      nombre: producto.c_nombre_producto,
      detalle: producto.c_detalle_primario_producto,
      cantidad: porcentaje.c_nombre_distribucion_tipo_medida,
      valor: porcentaje.f_valor_venta_suma,
      par: this.producto.b_par_producto,
      repeticiones: 1,
    }
    ////console.log("producto nuevo => ", parametro);
    
    this.ventaMomentoService.producotsVenta.push(parametro);
    this.openSnackBar(`PRODUCTO AÑADIDO PRECIO CONPUTADORA A ${porcentaje.f_valor_venta}`, 2500);
  }

  obtenerProductoFijo(producto:any, porcentaje:any, valor:any){
    this.ventaMomentoService.id = this.ventaMomentoService.id + 1;
    let parametro = {
      id: this.ventaMomentoService.id,
      nombre: producto.c_nombre_producto,
      detalle: producto.c_detalle_primario_producto,
      cantidad: porcentaje.c_nombre_distribucion_tipo_medida,
      valor: porcentaje.f_precio_estatico,
      par: this.producto.b_par_producto,
      repeticiones: 1,
    }
    ////console.log("producto nuevo => ", parametro);
    this.ventaMomentoService.producotsVenta.push(parametro);
    this.openSnackBar(`PRODUCTO AÑADIDO PRECIO ESTATICO A ${porcentaje.f_precio_estatico}`, 2500);
  }

  obtenerProductoFijoSuma(producto:any, porcentaje:any, valor:any){
    this.ventaMomentoService.id = this.ventaMomentoService.id + 1;
    let parametro = {
      id: this.ventaMomentoService.id,
      nombre: producto.c_nombre_producto,
      detalle: producto.c_detalle_primario_producto,
      cantidad: porcentaje.c_nombre_distribucion_tipo_medida,
      valor: porcentaje.f_precio_estatico_suma,
      par: this.producto.b_par_producto,
      repeticiones: 1,
    }
    ////console.log("producto nuevo => ", parametro);
    this.ventaMomentoService.producotsVenta.push(parametro);
    this.openSnackBar(`PRODUCTO AÑADIDO PRECIO ESTATICO A ${porcentaje.f_precio_estatico}`, 2500);
  }
    
  actualizarPorcentaje(){
    this.listado_precios  = this.getPrecioVentaSegunMedida(this.listado_precios);
  }

  actualizarPrecioFijo(g:any){
    ////console.log("precio renovado => ", g);
    
  }

  cerrar(){
    this.dialogRef.close({flag: false, data: null})
  }

  saveStockTmp(){
    let parametro = {
      n_id_producto : this.producto.n_id_producto,
      n_stock1 : this.producto.n_stock1,
      n_stock2 : this.producto.n_stock2,
      n_stock3: this.producto.n_stock3
    }
    this.productoService.saveStockTmp(parametro,{}).subscribe( res => {
      if(res.status){
        this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
      }else{
        this.openSnackBar("OCURRIO ALGO", 2500);
      }
    });
  }




}
