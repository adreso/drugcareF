import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { cargarGenerico, guardarGenerico } from '../../config/GenericoCrud';
import { Role } from '../../models/configuraciones/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    public http:HttpClient
  ) { }

  cargar(limite, offset, buscar){
    return cargarGenerico(limite, offset, buscar, this.http,'/api/roles');
  }

  guardar(role:Role){
    return guardarGenerico(role, '/api/roles', this.http);
  }
}
