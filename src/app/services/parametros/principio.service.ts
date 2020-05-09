import { Injectable } from '@angular/core';
import { cargarGenerico, guardarGenerico } from '../../config/GenericoCrud';
import { HttpClient } from '@angular/common/http';
import { Principio } from '../../models/parametros/principio.models';

@Injectable({
  providedIn: 'root'
})
export class PrincipioService {

  constructor(private http:HttpClient) { }

  cargar(limite, offset, buscar){
    return cargarGenerico(limite, offset, buscar, this.http,'/api/principios');
  }

  guardar(principio:Principio){
    return guardarGenerico(principio, '/api/principios', this.http);
  }
}
