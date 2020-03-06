import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Rutas
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainpageComponent } from './pages/mainpage.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainpageComponent,
    LoginComponent,
    NopagefoundComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
