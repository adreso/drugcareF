import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cargarGenerico, guardarGenerico } from '../../config/GenericoCrud';
import { Departamento } from '../../models/generales/departamentos.models';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(
    public http:HttpClient
  ) { }

  cargar(limite, offset, buscar){
    return cargarGenerico(limite, offset, buscar, this.http,'/api/departamentos');
  }

  guardar(departamento:Departamento){
    return guardarGenerico(departamento, '/api/departamentos', this.http);
  }


}
