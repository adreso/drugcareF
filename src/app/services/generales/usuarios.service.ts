import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cargarGenerico, guardarGenerico } from '../../config/GenericoCrud';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    public http:HttpClient
  ) { }

  cargar(limite, offset, buscar){
    return cargarGenerico(limite, offset, buscar, this.http,'/api/usuarios');
  }

  guardar(usuario){
    return guardarGenerico(usuario, '/api/usuarios', this.http);
  }

  buscarIdentificacion(identificacion:string){
    const headers = new HttpHeaders({'identificacion':identificacion});
    return this.http.get(URL_SERVICIOS+'/api/usuarios/identificacion', {headers}).pipe(
      map((resp:any)=>{return resp})
    )
  }
  buscarEmail(email:string){
    const headers = new HttpHeaders({'email':email});
    return this.http.get(URL_SERVICIOS+'/api/usuarios/email', {headers}).pipe(
      map((resp:any)=>{return resp})
    )
  }
  buscarUsuario(usuario:string){
    const headers = new HttpHeaders({'usuario':usuario});
    return this.http.get(URL_SERVICIOS+'/api/usuarios/usuario', {headers}).pipe(
      map((resp:any)=>{return resp})
    )
  }
}
