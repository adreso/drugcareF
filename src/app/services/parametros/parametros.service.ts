import { Injectable } from '@angular/core';
import { cargarGenerico, guardarGenerico, cargarIndividual ,cargarConEstado} from '../../config/GenericoCrud';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(private http:HttpClient) { }

  cargar(limite, offset, buscar, ruta){
    return cargarGenerico(limite, offset, buscar, this.http,'/api/'+ruta);
  }

  cargarIndividual(ruta){
    return cargarIndividual(this.http, '/api/'+ruta);
  }
 
  cargarConEstado(ruta,estado){
  return  cargarConEstado(this.http,'/api/'+ruta,estado); 
  }

  guardar(parametro:any, ruta:string){
    return guardarGenerico(parametro, '/api/'+ruta, this.http);
  }

}
