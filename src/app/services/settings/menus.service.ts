import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { cargarGenerico, guardarGenerico } from '../../config/GenericoCrud';
import { Menu } from '../../models/configuraciones/menus.model';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import {   throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(
    public http:HttpClient
  ) { }

  cargar(limite, offset, buscar){
    return cargarGenerico(limite, offset, buscar, this.http,'/api/menus');
  }

  guardar(menu:Menu){
    return guardarGenerico(menu, '/api/menus', this.http);
  }

  cargarPermisos(roleId:number, buscar:string){
    const headers = new HttpHeaders({'roleid':roleId+'', 'buscar':buscar});
    let url = URL_SERVICIOS + '/api/menus/rolespermisos';
    return this.http.get(url, {headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    )
  }

  guardarPermisos(roleId:number, permisoId:number, checked:boolean){
    let url = URL_SERVICIOS+'/api/ventanasaccionesrole';
    const data ={'roleid':roleId, 'permisoid':permisoId, 'estado':checked};
    return this.http.post(url, data).pipe(
      map(resp =>resp),
      catchError(err=>throwError(err))
    )
  }
}
