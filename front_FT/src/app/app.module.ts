import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


//MATERIAL
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TipoMedidaComponent } from './components/admin/tipo-medida/tipo-medida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditTipoMedidaComponent } from './components/admin/edit-tipo-medida/edit-tipo-medida.component';
import { BaseComponent } from './components/generico/base/base.component';
import { SnackComponent } from './components/generico/snack/snack.component';
import { ConfirmComponent } from './components/generico/confirm/confirm.component';
import { ProveedorComponent } from './components/admin/proveedor/proveedor.component';
import { EditProveedorComponent } from './components/admin/edit-proveedor/edit-proveedor.component';
import { ProductoComponent } from './components/admin/producto/producto.component';
import { EditProductoComponent } from './components/admin/edit-producto/edit-producto.component';
import { DistribucionTipoComponent } from './components/admin/distribucion-tipo/distribucion-tipo.component';
import { EditDistribucionTipoComponent } from './components/admin/edit-distribucion-tipo/edit-distribucion-tipo.component';
import { EditGrupoComponent } from './components/admin/edit-grupo/edit-grupo.component';
import { GrupoComponent } from './components/admin/grupo/grupo.component';
import { CambioPorcentajeXGrupoComponent } from './components/admin/cambio-porcentaje-xgrupo/cambio-porcentaje-xgrupo.component';
import { ConstantesComponent } from './components/admin/constantes/constantes.component';
import { EditConstantesComponent } from './components/admin/edit-constantes/edit-constantes.component';
import { VentaGrupoComponent } from './components/user/venta-grupo/venta-grupo.component';
import { VentaProductoComponent } from './components/user/venta-producto/venta-producto.component';
import { VentaProductoDetalleComponent } from './components/user/venta-producto-detalle/venta-producto-detalle.component';
import { VentaMomentoComponent } from './components/user/venta-momento/venta-momento.component';
import { CambiarPorcentajeSeleccionadoComponent } from './components/admin/cambiar-porcentaje-seleccionado/cambiar-porcentaje-seleccionado.component';
import { CambioPorcentajeTipoMedidaComponent } from './components/admin/cambio-porcentaje-tipo-medida/cambio-porcentaje-tipo-medida.component';
import { ProductosXNombreComponent } from './components/admin/productos-xnombre/productos-xnombre.component';
import { FormCredentialComponent } from './components/security/form-credential/form-credential.component';
import { HomeComponent } from './components/inicio/home/home.component';
import { PedidoComponent } from './components/admin/pedido/pedido.component';



@NgModule({
  declarations: [
    AppComponent,
    TipoMedidaComponent,
    InicioComponent,
    EditTipoMedidaComponent,
    BaseComponent,
    SnackComponent,
    ConfirmComponent,
    ProveedorComponent,
    EditProveedorComponent,
    ProductoComponent,
    EditProductoComponent,
    DistribucionTipoComponent,
    EditDistribucionTipoComponent,
    EditGrupoComponent,
    GrupoComponent,
    CambioPorcentajeXGrupoComponent,
    ConstantesComponent,
    EditConstantesComponent,
    VentaGrupoComponent,
    VentaProductoComponent,
    VentaProductoDetalleComponent,
    VentaMomentoComponent,
    CambiarPorcentajeSeleccionadoComponent,
    CambioPorcentajeTipoMedidaComponent,
    ProductosXNombreComponent,
    FormCredentialComponent,
    HomeComponent,
    PedidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
