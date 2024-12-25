import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../generico/base/base.component';
import { Producto } from 'src/app/interface/producto.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DistribucionTipoService } from 'src/app/service/distribucion-tipo.service';
import { TipoMedidaService } from 'src/app/service/tipo-medida.service';
import { ProductoService } from 'src/app/service/producto.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = [ 'c_nombre_producto', 'c_nombre_distribucion_tipo_medida', 'f_valor_porcentaje', 'precio_venta','f_precio_estatico'];
  public tablaPorcentajes!: MatTableDataSource<any>;

  producto!: Producto;
  editar:boolean=false;
  listaTipoMedida:any = [];
  listaValidaCodigoProducto:any = [];
  listaGrupo:any = [];
  listaProveedor:any = [];
  listaProducto:any = [];
  filteredOptions!: Observable<any[]>;

  dolar:number = 0;
  igv:number = 0;

  cantidad:number = 0;
  precioXCantidad:number = 0;

  STOCK:string = "STOCK";
  PEDIDO:string = "PEDIDO";

  constructor(
    override snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public distribucionTipoService:DistribucionTipoService,
    public tipoMedidaService:TipoMedidaService,
    public productoService:ProductoService,
    ) { super(snackBar)}

    override ngOnInit(): void {
      this.obtenerValoresPrincipales();
      this.activarEditar(this.data.valor);
    }

    obtenerValoresPrincipales(){
      this.dolar = parseFloat(localStorage.getItem('dolar')!);
      this.igv = parseFloat(localStorage.getItem('igv')!);
      ////console.log("dolar => ", this.dolar);
      ////console.log("igv => ", this.igv);
    }

    getProductoLike(){
      let parametro = {
        c_nombre_producto : this.producto.nombreProductoAsociado,
      }
      this.productoService.getProductoLike(parametro,{}).subscribe( res => {
        ////console.log("res producto like => ", res);
        if(res.status){
          this.listaProducto = res.body.response1;
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    buscar(){
      this.getProductoLike();
    }

    getDatesForEdit(){
      let parametro = {
        n_id_producto : this.producto.n_id_producto,
        n_id_grupo : this.producto.n_id_grupo
      }
      this.productoService.getDatesForEdit(parametro,{}).subscribe( res => {
        ////console.log("res => ", res);
        if(res.status){
          this.listaTipoMedida = res.body.response1;
          this.listaGrupo = res.body.response2;
          this.listaProveedor = res.body.response3;
          if(res.body.response4!=null){
            this.getPrecioVentaSegunMedida(res.body.response4);
          }
          this.tablaPorcentajes = new MatTableDataSource<any>(res.body.response4);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    getRepetidoCodigoXGrupo(): Promise<boolean> {
      let parametro = {
        c_codigo_producto : this.producto.c_codigo_producto,
        n_id_grupo : this.producto.n_id_grupo,
        n_id_producto: this.producto.n_id_producto
      };
    
      return new Promise((resolve, reject) => {
        try {
          this.productoService.getRepetidoCodigoXGrupo(parametro, {}).subscribe(res => {
            if (res.status) {
              this.listaValidaCodigoProducto = res.body.response1;
              //console.log("codigos => ", this.listaValidaCodigoProducto);
              if (this.listaValidaCodigoProducto.length > 0) {
                this.openSnackBar(`YA EXISTE EL CÓDIGO ${this.producto.c_codigo_producto}`, 2500);
                resolve(false);  // Ya existe el código
              } else {
                //console.log("ENTRO");
                resolve(true);  // No existe, se puede usar el código
              }
            } else {
              this.openSnackBar("OCURRIO ALGO", 2500);
              resolve(false);  // Error en la respuesta
            }
          });
        } catch (e) {
          this.openSnackBar("OCURRIO ALGO", 2500);
          reject(false);  // Manejo de error en la petición
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
        //console.log("no tiene igv");
        
        ////console.log("antes del igv => ", precioProducto);
        precioProducto = precioProducto +precioProducto*this.igv;
        ////console.log("precio en igv => ", precioProducto);
      }
      data.map((d:any) => {
        d.f_valor_venta = parseFloat((Math.ceil((precioProducto * d.f_distribucion_tipo_medida + precioProducto * d.f_distribucion_tipo_medida * d.f_valor_porcentaje) * 10) / 10).toFixed(2));
      });
      ////console.log("datos => ", data);
      
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

    before_id_grupo:any = 0;
    activarEditar(data:Producto){
      if(data==null){
        this.inicializar();
        this.editar=false;
        ////console.log("this.data => ", this.data);
        this.producto.n_id_grupo = this.data.n_id_grupo;
      }else{
        this.producto = data;
        this.getPedidoLocales();
        this.before_id_grupo = data.n_id_grupo;
        this.editar=true;
      }
      this.getDatesForEdit();
    }

    getPedidoLocales(){
      this.producto.n_pedido1_local = this.producto.n_pedido1;
      this.producto.n_pedido2_local = this.producto.n_pedido2;
      this.producto.n_pedido3_local = this.producto.n_pedido3;
    }

    seleccionarTipoMedida(valor:any){
      this.producto.n_id_tipo_medida = valor;
    }

    seleccionarGrupo(valor:any){
      this.producto.n_id_grupo = valor;
    }

    seleccionarProveedor(valor:any){
      this.producto.n_id_proveedor = valor;
    }

    seleccionarProductoAsociado(valor:any){
      this.producto.n_id_producto_asociado = valor;
    }

    async guardar(){
      /* //console.log("producto => ", this.producto);
      ////console.log("before_id_grupo => ", this.before_id_grupo); */
      let b_actualizarGrupoPorcentaje:boolean = false;
      if(this.before_id_grupo !== this.producto.n_id_grupo){
        b_actualizarGrupoPorcentaje = true;
      }
      if(await this.getRepetidoCodigoXGrupo()){
        if(this.editar){
          this.updateProducto(b_actualizarGrupoPorcentaje);
        }else{
          this.saveProducto();
        }
      }else{
        //console.log("paso algo");
      }
    }

    updateSotck(stock:number, caseGeneric: number){
      let c_fec_actu_stock = this.formatFecha();
      this.changeFecha(caseGeneric, c_fec_actu_stock, this.STOCK);
      let parametro = {
        caseGeneric: caseGeneric,
        n_id_producto: this.producto.n_id_producto,
        n_stock: stock,
        c_fec_actu_stock: c_fec_actu_stock
      }

      this.productoService.updateSotck(parametro,{}).subscribe( res => {
        if(res.status){
          this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    

    changeActivo(){
      let parametro = {
        n_id_producto: this.producto.n_id_producto,
        n_activo: this.producto.n_activo == 0? 1 : 0,
      }

      this.productoService.changeActivo(parametro,{}).subscribe( res => {
        if(res.status){
          this.producto.n_activo = parametro.n_activo;
          this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    updateDescripcionPedido(){
      let parametro = {
        n_id_producto: this.producto.n_id_producto,
        c_descripcion_pedido: this.producto.c_descripcion_pedido ,
      }

      this.productoService.updateDescripcionPedido(parametro,{}).subscribe( res => {
        if(res.status){
          this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    evaluateUpdatePedido(pedido:number, caseGeneric: number){
      if(pedido == 0){
        this.updatePedido(pedido, caseGeneric);
      }else{
        this.updatePedidoSegunStock(pedido, caseGeneric);
      }
    }

    updatePedido(pedido:number, caseGeneric: number){
      let c_fec_actu_pedido = this.formatFecha();
      this.changeFecha(caseGeneric, c_fec_actu_pedido, this.PEDIDO);
      let parametro = {
        caseGeneric: caseGeneric,
        n_id_producto: this.producto.n_id_producto,
        n_pedido: pedido,
        c_fec_actu_pedido: c_fec_actu_pedido
      }

      this.productoService.updatePedido(parametro,{}).subscribe( res => {
        if(res.status){
          this.getPedidoLocales();
          this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    validarPedido(pedido:number, caseGeneric: number){
      if(pedido == 0){
        this.openSnackBar("NO SE PUEDE REALIZAR UN PEDIDO DE 0", 2500);
      }else{
        this.updatePedido(pedido, caseGeneric);
      }
    }

    cancelarPedido(caseGeneric: number){
      let c_fec_actu_pedido = this.formatFecha();
      this.changeFecha(caseGeneric, c_fec_actu_pedido, this.PEDIDO);

      let parametro = {
        caseGeneric: caseGeneric,
        n_id_producto: this.producto.n_id_producto,
        n_pedido: 0,
        c_fec_actu_pedido: c_fec_actu_pedido
      }

      this.productoService.updatePedido(parametro,{}).subscribe( res => {
        if(res.status){
          this.changeSegunPedidoCancelar(caseGeneric);
          this.getPedidoLocales();
          this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    changeSegunPedidoCancelar(caseGeneric: number){
      if(caseGeneric == 1){
        this.producto.n_pedido1 = 0;
        return this.producto.n_stock1;
      }else if(caseGeneric == 2){
        this.producto.n_pedido2 = 0;
        return this.producto.n_stock2;
      }else if(caseGeneric == 3){
        this.producto.n_pedido3 = 0;
        return this.producto.n_stock3;
      }
      return null;
    }


    changeFecha(caseGeneric: number, c_fec_actu: string, tipo: string){
      if(tipo == this.STOCK ){
        if(caseGeneric == 1){
          this.producto.c_fec_actu_stock1  = c_fec_actu
        }else if(caseGeneric == 2){
          this.producto.c_fec_actu_stock2  = c_fec_actu
        }else if(caseGeneric == 3){
          this.producto.c_fec_actu_stock3  = c_fec_actu
        }
      }else if(tipo == this.PEDIDO){
        if(caseGeneric == 1){
          this.producto.c_fec_actu_pedido1  = c_fec_actu
        }else if(caseGeneric == 2){
          this.producto.c_fec_actu_pedido2  = c_fec_actu
        }else if(caseGeneric == 3){
          this.producto.c_fec_actu_pedido3  = c_fec_actu
        }
      }
    }

    updatePedidoSegunStock(pedido:number, caseGeneric: number){
      let c_fec_actu = this.formatFecha();
      let stock = this.changeStockSegunPedido(caseGeneric);
      this.changeFecha(caseGeneric, c_fec_actu, this.PEDIDO);
      this.changeFecha(caseGeneric, c_fec_actu, this.STOCK);
      let parametro = {
        caseGeneric: caseGeneric,
        n_id_producto: this.producto.n_id_producto,
        n_pedido: 0,
        n_stock: stock,
        c_fec_actu_pedido: c_fec_actu,
        c_fec_actu_stock: c_fec_actu
      }

      this.productoService.updatePedidoSegunStock(parametro,{}).subscribe( res => {
        if(res.status){
          this.getPedidoLocales();
          this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    changeStockSegunPedido(caseGeneric: number){
      if(caseGeneric == 1){
        this.producto.n_stock1  = this.producto.n_stock1 + this.producto.n_pedido1;
        this.producto.n_pedido1 = 0;
        return this.producto.n_stock1;
      }else if(caseGeneric == 2){
       this.producto.n_stock2  = this.producto.n_stock2 + this.producto.n_pedido2;
        this.producto.n_pedido2 = 0;
        return this.producto.n_stock2;
      }else if(caseGeneric == 3){
       this.producto.n_stock3  = this.producto.n_stock3 + this.producto.n_pedido3;
        this.producto.n_pedido3 = 0;
        return this.producto.n_stock3;
      }
      return null;
    }

    formatFecha(): string{
      let fechaActual = new Date();
      let dia = fechaActual.getDate().toString().padStart(2, '0'); // Asegura 2 dígitos
      let mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Meses comienzan en 0
      let anio = fechaActual.getFullYear();
      let horas = fechaActual.getHours().toString().padStart(2, '0');
      let minutos = fechaActual.getMinutes().toString().padStart(2, '0');
      let segundos = fechaActual.getSeconds().toString().padStart(2, '0');

      let fec_actu_stock = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
      return fec_actu_stock;
    }

    saveProducto(){
      this.productoService.saveProducto(this.producto,{}).subscribe( res => {
        ////console.log("res save => ", res);
        if(res.status){
          this.producto.n_id_producto = res.body.response2[0].id;
          ////console.log("id obtenido => ",this.producto.n_id_producto);
          
          this.tablaPorcentajes = new MatTableDataSource<any>(res.body.response3);
          this.editar = true;
          this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    updateProducto(b_actualizarGrupoPorcentaje:boolean){
      let parametro = {
        n_id_producto :this.producto.n_id_producto,
        n_id_tipo_medida :this.producto.n_id_tipo_medida,
        n_id_grupo :this.producto.n_id_grupo,
        c_codigo_producto :this.producto.c_codigo_producto,
        n_id_proveedor :this.producto.n_id_proveedor,
        c_nombre_producto :this.producto.c_nombre_producto,
        c_detalle_primario_producto :this.producto.c_detalle_primario_producto,
        c_descripcion_producto :this.producto.c_descripcion_producto,
        f_precio_producto :this.producto.f_precio_producto,
        b_igv_producto :this.producto.b_igv_producto,
        b_dolar_producto :this.producto.b_dolar_producto,
        b_par_producto :this.producto.b_par_producto,
        n_cantidad_viene_producto :this.producto.n_cantidad_viene_producto,
        n_precio_por_cantidad_viene_producto :this.producto.n_precio_por_cantidad_viene_producto,
        b_actualizarGrupoPorcentaje: b_actualizarGrupoPorcentaje,
        n_id_producto_asociado: this.producto.n_id_producto_asociado,
        c_color: this.producto.c_color
      }
      ////console.log("parametro de actualizacion = >", parametro);
      
      this.productoService.updateProducto(parametro,{}).subscribe( res => {
        ////console.log("res upd => ", res);
        if(res.status){
          this.getDatesForEdit();
          this.openSnackBar("ACTUALIZADO CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
          //console.log("error => ", res);
          
        }
      });
    }
    
    cerrar(){
      this.dialogRef.close({flag: false, data: null})
    }


    //SECCION DE PORCENTAJES
    actualizarValor(element:any){
      let parametro = {
        n_id_distribucion_tipo_medida: element.n_id_distribucion_tipo_medida,
        n_id_producto: this.producto.n_id_producto,
        n_id_grupo: this.producto.n_id_grupo,
        f_valor_porcentaje: element.f_valor_porcentaje,
        f_precio_estatico: element.f_precio_estatico
      }
      ////console.log("parametro de valor porcentaje => ", parametro);
      
      if(element.actualizar){
        this.updatePorcentajeDistribucionProducto(parametro);
      }else{
        this.savePorcentajeDistribucionProducto(parametro);
      }
    }


    savePorcentajeDistribucionProducto(parametro:any){
      this.productoService.savePorcentajeDistribucionProducto(parametro,{}).subscribe( res => {
        ////console.log("res => ", res);
        if(res.status){
          this.getDatesForEdit();
          this.openSnackBar("GUARDADO CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }

    updatePorcentajeDistribucionProducto(parametro:any){
      this.productoService.updatePorcentajeDistribucionProducto(parametro,{}).subscribe( res => {
        ////console.log("res => ", res);
        if(res.status){
          this.getDatesForEdit();
          this.openSnackBar("ACTUALIZADO CORRECTAMENTE", 2500);
        }else{
          this.openSnackBar("OCURRIO ALGO", 2500);
        }
      });
    }
    
    actualizarPrecioXUnidad(){
      this.producto.f_precio_producto = (Number)((this.producto.n_precio_por_cantidad_viene_producto/this.producto.n_cantidad_viene_producto).toFixed(7));
    }


}
