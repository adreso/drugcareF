import { NgModule  } from '@angular/core';

import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import {SharedModule} from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PaisesComponent } from './generales/paises/paises.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PaisesComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    CommonModule
  ],
  exports: [
    DashboardComponent,
    AccountSettingsComponent
  ],
  providers: [],
})
export class PagesModule {}
