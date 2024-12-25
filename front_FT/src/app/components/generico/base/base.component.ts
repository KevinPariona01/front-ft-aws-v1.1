import { Component, OnInit } from '@angular/core';
import { SnackInterface } from 'src/app/interface/snack.interface';
import { SnackComponent } from '../snack/snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  }

  objsnack: SnackInterface = {
    mensaje: "",
    tipo: 0
  };

  public openSnackBar(mensaje: String, tipo: number) {
      this.objsnack.mensaje = mensaje;
      this.objsnack.tipo = tipo;
      this.snackBar.openFromComponent(SnackComponent, {
        duration: tipo,
        data: this.objsnack
      });
  }

  pagin:any = [10,50,100,500];


}
