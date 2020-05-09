import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ventana } from '../../models/configuraciones/ventanas.models';
import { guardarGenerico, cargarGenerico, cargarGenericoAsociado } from '../../config/GenericoCrud';
import { Accione } from '../../models/configuraciones/acciones.model';

@Injectable({
  providedIn: 'root'
})
export class PermisosService{


  constructor(
    public http:HttpClient
  ) { }

  cargarVentanas(limite, offset, buscar){
    return cargarGenerico(limite, offset, buscar, this.http, '/api/ventanas');
  }

  guardarVentana(ventana:Ventana){
    return guardarGenerico(ventana, '/api/ventanas', this.http);
  }

  guardarAccione(accione:Accione){
    // accione.ventana.id=ventana.id;
    return guardarGenerico(accione, '/api/acciones', this.http);
  }

  cargarAcciones(limite, offset, buscar, ventana:Ventana){
    return cargarGenericoAsociado(limite, offset, buscar, this.http, '/api/acciones', ventana);
  }
}
