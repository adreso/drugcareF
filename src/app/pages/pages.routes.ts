import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PaisesComponent } from './generales/paises/paises.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { PermisosComponent } from './configuracion/permisos/permisos.component';
import { RolesComponent } from './configuracion/roles/roles.component';
import { MenusComponent } from './configuracion/menus/menus.component';
import { RolespermisosComponent } from './configuracion/rolespermisos/rolespermisos.component';
import { DepartamentosComponent } from './generales/departamentos/departamentos.component';
import { CiudadesComponent } from './generales/ciudades/ciudades.component';
import { UsuariosComponent } from './generales/usuarios/usuarios.component';
import { PrincipiosComponent } from './parametros/principios/principios.component';
import { PropiedadesComponent } from './parametros/propiedades/propiedades.component';
import { GruposterapeuticosComponent } from './parametros/gruposterapeuticos/gruposterapeuticos.component';
import { EnfermedadesComponent } from './parametros/enfermedades/enfermedades.component';
import { TipoparaclinicosComponent } from './parametros/tipoparaclinicos/tipoparaclinicos.component';
import { TipohorariosComponent } from './parametros/tipohorarios/tipohorarios.component';
import { PacientesComponent } from './historia/pacientes/pacientes.component';
import { FormPacienteComponent } from './historia/pacientes/form-paciente/form-paciente.component';
import { PerfilComponent } from './historia/pacientes/perfil/perfil.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate:[AuthGuard],
    children:
    [
      { path: 'dashboard', component: DashboardComponent, data:{titulo:'Dashboard'} },
      { path: 'settings', component: AccountSettingsComponent, data:{titulo:'Configuración del tema'} },
      { path: 'paises', component: PaisesComponent, data:{titulo:'Paises'} },
      { path: 'permisos', component: PermisosComponent, data:{titulo:'Configuración de permisos'} },
      { path: 'roles', component: RolesComponent, data:{titulo:'Configuración de roles'} },
      { path: 'menus', component: MenusComponent, data:{titulo:'Configuración de menu'} },
      { path: 'rolespermisos', component: RolespermisosComponent, data:{titulo:'Asignación de permisos a los roles'} },
      { path: 'departamentos', component: DepartamentosComponent, data:{titulo:'Departamentos'} },
      { path: 'ciudades', component: CiudadesComponent, data:{titulo:'Ciudades'} },
      { path: 'usuarios', component: UsuariosComponent, data:{titulo:'Usuarios'} },
      { path: 'principios', component: PrincipiosComponent, data:{titulo:'Principios activos'} },
      { path: 'propiedades', component: PropiedadesComponent, data:{titulo:'Propiedades de los medicamentos'} },
      { path: 'gruposterapeuticos', component: GruposterapeuticosComponent, data:{titulo:'Grupos terapéuticos'} },
      { path: 'enfermedades', component: EnfermedadesComponent, data:{titulo:'Enfermedades'} },
      { path: 'tipoparaclinicos', component: TipoparaclinicosComponent, data:{titulo:'Tipos de paraclinicos'} },
      { path: 'tipohorarios', component: TipohorariosComponent, data:{titulo:'Tipos de horarios'} },
      { path: 'pacientes', children:
      [
        {path: '', component: PacientesComponent, data:{titulo:'Todos los pacientes'}},
        {path: 'agregarpaciente', component: FormPacienteComponent, data:{titulo:'Agregar paciente'}},
        { path: 'agregarpaciente/:identificacion', component: FormPacienteComponent, data:{titulo:'Agregar paciente'}},
        { path: 'perfil/:id', component: PerfilComponent, data:{titulo:'Perfil paciente'}},
      ]},

      // { }},


      { path: '', redirectTo: '/dashboard', pathMatch:'full' },
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
