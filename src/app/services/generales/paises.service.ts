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

  cargarHospitales(){
    let url = URL_SERVICIOS + '/api/paises';

    return this.http.get(url)
    // .pipe(
    //   map(
    //     (resp:any) => {
    //       return resp.pais;
    //     }
    //   )
    // )
  }

}
