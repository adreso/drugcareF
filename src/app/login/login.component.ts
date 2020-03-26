import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Toast } from '../config/alertas';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  recuerdame:boolean=false;
  usuario:string;
  constructor(
    private router:Router,
    private _usuarioService:UsuarioService

    ) {
   }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('usuario') || '';
    this.usuario.length>0?this.recuerdame=true:this.recuerdame=false;
  }

  ingresar(forma: NgForm){
    if(forma.invalid){
      return;
    }

    let usuario= new Usuario(forma.value.usuario, forma.value.password, 1);

    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe(resp => {
      Toast.fire({icon:'success', title:'Ha ingresado correctamente'});
      this.router.navigate(['/dashboard']);
    }
    );

    // console.log('console');
    // this.router.navigate(['/dashboard']);
  }
}
