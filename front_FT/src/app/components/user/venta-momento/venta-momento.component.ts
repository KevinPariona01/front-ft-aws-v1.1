import { Component, OnInit } from '@angular/core';
import { VentaMomentoService } from 'src/app/service/venta-momento.service';

@Component({
  selector: 'app-venta-momento',
  templateUrl: './venta-momento.component.html',
  styleUrls: ['./venta-momento.component.css']
})
export class VentaMomentoComponent implements OnInit {

  total:number = 0;

  constructor(
    public ventaMomentoService: VentaMomentoService,
  ) { }

  ngOnInit(): void {
    this.obtenerTotal();
  }

  obtenerTotal(){
    this.ventaMomentoService.producotsVenta.forEach( v => {
      this.total = parseFloat(v.valor)*parseFloat(v.repeticiones) + this.total;
      this.total = (Number)((this.total).toFixed(2));
    });
  }

  borrarVenta(){
    this.ventaMomentoService.producotsVenta = [];
    this.ventaMomentoService.id =0;
    this.total = 0;
  }

  eliminarProducto(g:any){
    ////console.log("producto => ", g);
    this.ventaMomentoService.producotsVenta = this.ventaMomentoService.producotsVenta.filter( r => r.id !== g.id);
    this.total = 0;
    this.obtenerTotal();
  }

  actualizarMonto(){
    this.total = 0;
    this.obtenerTotal();
  }

}
