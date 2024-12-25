import { Component, Inject, OnInit } from '@angular/core';
import { SnackInterface } from 'src/app/interface/snack.interface';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.css']
})
export class SnackComponent implements OnInit {

  mensaje:String = '';
  tipo: number = 0;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackInterface) { }

  ngOnInit() {
    this.mensaje = this.data.mensaje;
    this.tipo= this.data.tipo;

  }

}
