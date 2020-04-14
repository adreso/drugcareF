import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cargarGenerico, guardarGenerico } from '../../config/GenericoCrud';
import { Ciudade } from '../../models/generales/ciudades.models';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  constructor(
    public http:HttpClient
  ) { }

  cargar(limite, offset, buscar){
    return cargarGenerico(limite, offset, buscar, this.http,'/api/ciudades');
  }

  guardar(ciudade:Ciudade){
    return guardarGenerico(ciudade, '/api/ciudades', this.http);
  }


}
