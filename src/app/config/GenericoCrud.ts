import { URL_SERVICIOS } from './config';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const token = (token) => {
  return {'x-access-token':token, 'authorization':token}
}

export const guardarGenerico =(modelo:any, ruta:string, http:HttpClient) =>{
  // const headers = new HttpHeaders(this.token(tok));

    let url = URL_SERVICIOS + ruta;
    if(modelo.id){
      url+='/'+modelo.id;
      return http.put(url, modelo).pipe(
        map(resp => resp),
        catchError(err =>throwError(err))
      );
    }else{
      return http.post(url, modelo).pipe(
          map(resp => resp),
          catchError(err =>throwError(err)
        )
      );
    }
  }

  export const cargarGenerico= (limite, offset, buscar, http:HttpClient, ruta:string) =>{
    const headers = new HttpHeaders({'limite':limite, 'offset':offset, 'buscar':buscar});
    let url = URL_SERVICIOS + ruta;
    return http.get(url, {headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );
  }

  export const cargarGenericoAsociado = (limite, offset, buscar, http:HttpClient, ruta:string, foraneo:any) =>{
    const headers = new HttpHeaders({'limite':limite, 'offset':offset, 'buscar':buscar, 'foraneo':foraneo.id+'' });
    let url = URL_SERVICIOS + ruta;
    return http.get(url, {headers}).pipe(
      map((resp:any)=>{
        return resp;
      })
    );
  }