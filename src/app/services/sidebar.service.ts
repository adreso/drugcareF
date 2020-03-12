import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  menu: any = [
    {
      titulo: 'principal',
      icono:'nav-icon fas fa-tachometer-alt',
      submenu:[
        {
          titulo:'Dashboard',
          url:'/dashboard'

        }
      ]
    }
  ]
}
