import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../service/security.service';
import { BaseComponent } from '../components/generico/base/base.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends BaseComponent implements CanActivate {

  constructor(
    override snackBar: MatSnackBar, 
    private securityService: SecurityService, private router: Router
  ) { super(snackBar) }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verificar la variable en el servicio
    if (this.securityService.isAdmin) {
      return true; // Permitir acceso
    } else {
      // Redirigir al usuario si no está autorizado
      this.router.navigate(['/inicio']);
      this.openSnackBar("INTRODUZCA LA CONTRASEÑA PAYASO", 2500);
      return false;
    }
  }
  
}
