import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { cargarGenerico, guardarGenerico } from '../../config/GenericoCrud';
import { Menu } from '../../models/configuraciones/menus.model';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(
    public http:HttpClient
  ) { }

  cargar(limite, offset, buscar){
    return cargarGenerico(limite, offset, buscar, this.http,'/api/menus');
  }

  guardar(menu:Menu){
    return guardarGenerico(menu, '/api/menus', this.http);
  }
}
