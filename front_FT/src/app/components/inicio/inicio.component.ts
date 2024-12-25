import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConstantesService } from 'src/app/service/constantes.service';
import { VentaMomentoComponent } from '../user/venta-momento/venta-momento.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { SecurityService } from 'src/app/service/security.service';
import { FormCredentialComponent } from '../security/form-credential/form-credential.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  idPanel: number = 0;
  iditem: number = 0;

  @ViewChild('drawer') drawer!: MatSidenav;

  date!: Date;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private constantesService: ConstantesService,
    public securityService: SecurityService,
    public dialog: MatDialog
  ) {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.getDolar();
    this.idPanel = parseInt(localStorage.getItem('panelMenu')!);
    this.iditem = parseInt(localStorage.getItem('itemMenu')!);
  }

  /* isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result:any) => result.matches)
  ); */

  panel(panel: any, item: any) {
    localStorage.setItem('panelMenu', panel);
    localStorage.setItem('itemMenu', item);
  }

  getDolar() {
    this.constantesService.getDolar({}, {}).subscribe((res) => {
      ////console.log("res dolar=> ", res);
      if (res.status) {
        localStorage.setItem('dolar', res.body.response1[0].c_valor_constante);
        localStorage.setItem('igv', res.body.response2[0].c_valor_constante);
      } else {
        ////console.log("algo paso");
      }
    });
  }

  verVentasMomento() {
    const dialogRef = this.dialog.open(VentaMomentoComponent, {
      panelClass: 'custom-dialog-container',
      width: '95vw',
      maxHeight: '90vh',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      try {
      } catch (error) {
        ////console.log(error);
      }
    });
  }

  toggleSidenav(open: boolean | undefined = undefined) {
    if (open !== undefined) {
      this.drawer.toggle(open);
    } else {
      this.drawer.toggle();
    }
  }

  validateCredentials(){
    const dialogRef = this.dialog.open(FormCredentialComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
      } catch (error) {
      }
    });
  }

}
