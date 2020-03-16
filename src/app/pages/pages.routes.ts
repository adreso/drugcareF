import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PaisesComponent } from './generales/paises/paises.component';
import { AuthGuard } from '../services/guards/auth.guard';

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
      { path: '', redirectTo: '/dashboard', pathMatch:'full' },
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
