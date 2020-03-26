import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paise } from './../../models/generales/paises.models';
import {URL_SERVICIOS} from './../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Toast, ToastErrores } from '../../config/alertas';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  totalPaises:number;

  constructor(
    public http:HttpClient
  ) { }

  cargarPaises(limite, offset, buscar){
    const headers = new HttpHeaders({'limite':limite, 'offset':offset, 'buscar':buscar});

    let url = URL_SERVICIOS + '/api/paises';
    return this.http.get(url, {headers}).pipe(
      map((resp:any)=>{

        this.totalPaises=resp.total;

        return resp.paises;
      })
    );
  }

  guardarMedico(pais:Paise){
    let url = URL_SERVICIOS + '/api/paises';

    if(pais.id){
      url+='/'+pais.id;
      return this.http.put(url, pais)
      .pipe(map(
        (resp:any)=>{
          Toast.fire({icon:'success', title:'Pais guardado correctamente'});
          return resp.pais;
        }
      ),
      catchError(err =>{
        ToastErrores(err);
        return throwError(err);
      })
      )

    }else{
    return this.http.post(url, pais)
    .pipe(map(
      (resp:any) => {
        Toast.fire({icon:'success', title:'Pais guardado correctamente'});
        return resp.medico;
      }
    ),
      catchError(err =>{
        ToastErrores(err);
        return throwError(err);
      })
    );
    }
  }



}
