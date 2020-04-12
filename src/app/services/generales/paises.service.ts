import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paise } from './../../models/generales/paises.models';

import { cargarGenerico, guardarGenerico } from '../../config/GenericoCrud';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(
    public http:HttpClient
  ) { }

  cargarPaises(limite, offset, buscar){
    return cargarGenerico(limite, offset, buscar, this.http,'/api/paises');
  }

  guardar(pais:Paise){
    return guardarGenerico(pais, '/api/paises', this.http);
  }


}
