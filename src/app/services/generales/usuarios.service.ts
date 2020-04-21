import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cargarGenerico, guardarGenerico } from '../../config/GenericoCrud';
import { Usuario } from 'src/app/models/usuario.model';

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

  guardar(usuario:Usuario){
    return guardarGenerico(usuario, '/api/usuarios', this.http);
  }


}
