import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoMedidaComponent } from './components/admin/tipo-medida/tipo-medida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DistribucionTipoComponent } from './components/admin/distribucion-tipo/distribucion-tipo.component';
import { ProductoComponent } from './components/admin/producto/producto.component';
import { GrupoComponent } from './components/admin/grupo/grupo.component';
import { CambioPorcentajeXGrupoComponent } from './components/admin/cambio-porcentaje-xgrupo/cambio-porcentaje-xgrupo.component';
import { ConstantesComponent } from './components/admin/constantes/constantes.component';
import { VentaGrupoComponent } from './components/user/venta-grupo/venta-grupo.component';
import { VentaProductoComponent } from './components/user/venta-producto/venta-producto.component';
import { CambioPorcentajeTipoMedidaComponent } from './components/admin/cambio-porcentaje-tipo-medida/cambio-porcentaje-tipo-medida.component';
import { ProductosXNombreComponent } from './components/admin/productos-xnombre/productos-xnombre.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/inicio/home/home.component';
import { ProveedorComponent } from './components/admin/proveedor/proveedor.component';
import { PedidoComponent } from './components/admin/pedido/pedido.component';
import { DinamicoProductoEditComponent } from './components/admin/dinamico-producto-edit/dinamico-producto-edit.component';

const routes: Routes = [
  {path:'inicio', component:HomeComponent},
  {path:'tipo_medida', component:TipoMedidaComponent, canActivate: [AuthGuard]},
  {path:'grupo', component:GrupoComponent, canActivate: [AuthGuard]},
  {path:'proveedor', component:ProveedorComponent, canActivate: [AuthGuard]},
  {path:'producto', component:ProductoComponent, canActivate: [AuthGuard]},
  {path:'buscarProductosXNombre', component:ProductosXNombreComponent, canActivate: [AuthGuard]},
  {path:'distribucion_tipo_medida', component:DistribucionTipoComponent, canActivate: [AuthGuard]},
  {path:'cambioPorcentajeGrupo', component:CambioPorcentajeXGrupoComponent, canActivate: [AuthGuard]},
  {path:'cambioProductoTipoUnidad', component:CambioPorcentajeTipoMedidaComponent, canActivate: [AuthGuard]},
  {path:'constantes', component:ConstantesComponent, canActivate: [AuthGuard]},
  {path:'pedidoProducto', component:PedidoComponent, canActivate: [AuthGuard]},
  {path:'cambiarPrecioTabla', component:DinamicoProductoEditComponent, canActivate: [AuthGuard]},
  {path:'venta-grupo', component:VentaGrupoComponent},
  {path:'venta-producto/:id', component:VentaProductoComponent},
  {path:'**', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
