import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PaisesComponent } from './generales/paises/paises.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { PermisosComponent } from './configuracion/permisos/permisos.component';
import { RolesComponent } from './configuracion/roles/roles.component';
import { MenusComponent } from './configuracion/menus/menus.component';

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
      { path: '', redirectTo: '/dashboard', pathMatch:'full' },
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
