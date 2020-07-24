import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cargarGenerico } from '../../config/GenericoCrud';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(
    public http:HttpClient
  ) { }

  buscarIdentificacion(identificacion:string){
    const headers = new HttpHeaders({'identificacion':identificacion});
    return this.http.get(URL_SERVICIOS+'/api/pacientes/identificacion', {headers}).pipe(
      map((resp:any)=>{return resp})
    )
  }
}
