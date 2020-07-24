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
import { RolespermisosComponent } from './configuracion/rolespermisos/rolespermisos.component';
import { DepartamentosComponent } from './generales/departamentos/departamentos.component';
import { CiudadesComponent } from './generales/ciudades/ciudades.component';
import { UsuariosComponent } from './generales/usuarios/usuarios.component';
import { ButtonErrorValidatorComponent } from './shared/button-error-validator/button-error-validator.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { UsuarioDetalleComponent } from './generales/usuarios/usuario-detalle.component';
import { PrincipiosComponent } from './parametros/principios/principios.component';
import { FormPrincipioComponent } from './parametros/principios/formulario/form-principio.component';
import { PropiedadesComponent } from './parametros/propiedades/propiedades.component';
import { FormPropiedadesComponent } from './parametros/propiedades/formulario/form-propiedades.component';
import { GruposterapeuticosComponent } from './parametros/gruposterapeuticos/gruposterapeuticos.component';
import { FormGrupoterapeuticoComponent } from './parametros/gruposterapeuticos/formulario/form-grupoterapeutico.component';
import { EnfermedadesComponent } from './parametros/enfermedades/enfermedades.component';
import { FormEnfermedadComponent } from './parametros/enfermedades/formulario/form-enfermedad.component';
import { TipoparaclinicosComponent } from './parametros/tipoparaclinicos/tipoparaclinicos.component';
import { FormTipoParaclinicoComponent } from './parametros/tipoparaclinicos/formulario/form-tipo-paraclinico.component';
import { TipohorariosComponent } from './parametros/tipohorarios/tipohorarios.component';
import { FormTipoHorarioComponent } from './parametros/tipohorarios/formularios/form-tipo-horario.component';
import { EnfermedadesParaclinicosComponent } from './parametros/enfermedades/enfermedades-paraclinicos/enfermedades-paraclinicos.component';
import { PacientesComponent } from './historia/pacientes/pacientes.component';
import { FormPacienteComponent } from './historia/pacientes/form-paciente/form-paciente.component';
import { PerfilComponent } from './historia/pacientes/perfil/perfil.component';


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
    RolespermisosComponent,
    DepartamentosComponent,
    CiudadesComponent,
    UsuariosComponent,
    ButtonErrorValidatorComponent,
    UsuarioDetalleComponent,
    PrincipiosComponent,
    FormPrincipioComponent,
    PropiedadesComponent,
    FormPropiedadesComponent,
    GruposterapeuticosComponent,
    FormGrupoterapeuticoComponent,
    EnfermedadesComponent,
    FormEnfermedadComponent,
    TipoparaclinicosComponent,
    FormTipoParaclinicoComponent,
    TipohorariosComponent,
    FormTipoHorarioComponent,
    EnfermedadesParaclinicosComponent,
    PacientesComponent,
    FormPacienteComponent,
    PerfilComponent,
    
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    RxReactiveFormsModule,
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
