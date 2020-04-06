import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { 
    
  }

  


   menu:any=  JSON.parse(atob(sessionStorage.getItem('token').split(".")[1])).menu;
  // any = [
  //   {
  //     titulo: 'principal',
  //     icono:'nav-icon fas fa-tachometer-alt',
  //     submenu:[
  //       {
  //         titulo:'Dashboard',
  //         url:'/dashboard'

  //       },
  //       {
  //         titulo:'Paises',
  //         url:'/paises'
  //       },
  //       {
  //         titulo:'Config. Permisos',
  //         url:'/permisos'
  //       },
  //       {
  //         titulo:'Roles',
  //         url:'/roles'
  //       }
  //       ,
  //       {
  //         titulo:'Menus',
  //         url:'/menus'
  //       }
  //     ]
  //   }
  // ]
}
