import { NgModule  } from '@angular/core';

import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import {SharedModule} from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PaisesComponent } from './generales/paises/paises.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormPaisComponent } from './generales/paises/formulario/form-pais.component';
import { PermisosComponent } from './configuracion/permisos/permisos.component';
import { FormVentanaComponent } from './configuracion/permisos/formulario/form-ventana.component';
import { AccionesComponent } from './configuracion/permisos/acciones/acciones.component';
import { FormAccioneComponent } from './configuracion/permisos/acciones/formulario/form-accione.component';
import { PipesModule } from '../pipes/pipes.module';
import { RolesComponent } from './configuracion/roles/roles.component';
import { FormRolesComponent } from './configuracion/roles/formulario/form-roles.component';
import { MenusComponent } from './configuracion/menus/menus.component';
import { FormMenuComponent } from './configuracion/menus/formulario/form-menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PaisesComponent,
    FormPaisComponent,
    PermisosComponent,
    FormVentanaComponent,
    AccionesComponent,
    FormAccioneComponent,
    FormRolesComponent,
    RolesComponent,
    MenusComponent,
    FormMenuComponent,
    
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    NgbModule
  ],
  exports: [
    DashboardComponent,
    AccountSettingsComponent
  ],
  providers: [],
})
export class PagesModule {}
