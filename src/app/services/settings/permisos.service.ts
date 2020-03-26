import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Ventana } from '../../models/configuraciones/ventanas.models';
import { throwError } from 'rxjs';
import { Toast, ToastErrores } from '../../config/alertas';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  
  totalVentanas:number;

  constructor(
    public http:HttpClient
  ) { }

  cargarVentanas(limite, offset, buscar){
    const headers = new HttpHeaders({'limite':limite, 'offset':offset, 'buscar':buscar});

    let url = URL_SERVICIOS + '/api/ventanas';
    return this.http.get(url, {headers}).pipe(
      map((resp:any)=>{
        this.totalVentanas=resp.total;

        return resp.ventanas;
      })
    );
  }

  guardarVentana(ventana:Ventana){
    let url = URL_SERVICIOS + '/api/ventanas';

    if(ventana.id){
      url+='/'+ventana.id;
      return this.http.put(url, ventana)
      .pipe(map(
        (resp:any)=>{
          return resp.ventanas;
        }
      ),
      catchError(err =>{
        ToastErrores(err);
        return throwError(err);
      })
      
      )

    }else{
    return this.http.post(url, ventana)
    .pipe(map(
      (resp:any) => {
        return resp.ventana;
      }
    ),
    catchError(err =>{
      ToastErrores(err);
      return throwError(err);
    }));
    }
  }
  
}
