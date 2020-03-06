import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


const appRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children:
    [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: '/dashboard', pathMatch:'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: '**', component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash:true });
