import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paise } from './../../models/generales/paises.models';
import {URL_SERVICIOS} from './../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {



  constructor(
    public http:HttpClient
  ) { }

  cargarPaises(){
    let url = URL_SERVICIOS + '/api/paises';
    return this.http.get(url).pipe(
      map((resp:any)=>{
        return resp.paises;
      })
    );
  }

  guardarMedico(pais:Paise){
    let url = URL_SERVICIOS + '/api/paises';

    // if(pais.id){
    //   //actualizando
    //   url+='/'+pais.id;
    //   // url+='?token='+this._usuarioService.token;

    //   return this.http.put(url, pais)
    //   .pipe(map(
    //     (resp:any)=>{
    //       console.log(pais.nombre);
    //       // swal('Médico actualizado', medico.nombre, 'success');
    //       return resp.pais;
    //     }
    //   ))

    // }else{
    //creando

    // url+='?token='+this._usuarioService.token;
    return this.http.post(url, pais)
    .pipe(map(
      (resp:any) => {
        // console.log(pais.nombre);
        // swal('Médico creado', medico.nombre, 'success');
        return resp.medico;
      }
    ));
    // }


  }



}
