import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Toast } from './../../config/alertas';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token:string='';
  id:string='';

  constructor(public http:HttpClient, public router:Router) {
    this.cargarStorage();

  }

  estaLogueado(){
    return (this.token.length >5)?true:false;
  }

  crearUsuario(usuario:Usuario){
    let url =URL_SERVICIOS+'/api/usuario';
    return this.http.post(url, usuario).pipe(
      map((resp:any) => {
        Toast.fire({icon:'success', title:'Usuario creado correctamente'});
        return resp.usuario;
      })
    );
  }

  login(usuario:Usuario, recordar:boolean=false){

    if(recordar){
      sessionStorage.setItem('usuario', usuario.usuario);
    }else{
      sessionStorage.removeItem('usuario');
    }
    let url = URL_SERVICIOS+'/api/login';
    return this.http.post(url, usuario)
    .pipe(
      map(
        (resp:any)=>{
          this.guardarStorage(resp.id, resp.token);
          return true;
        }
      )
    )
    ;
  }

  guardarStorage(id:string, token:string){
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('token', token);

    this.token = token;
    this.id = id;
  }

  cargarStorage(){
    if(sessionStorage.getItem('token')){
      this.token=sessionStorage.getItem('token');
      this.id=sessionStorage.getItem('id');
    }else{
      this.token="";
      this.id="";
    }
  }

  logout(){
    this.token='';
    this.id='';
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
}
