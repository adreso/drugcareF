import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { Toast } from '../config/alertas';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  forma:FormGroup;

  constructor(
    public _usuarioService:UsuarioService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      usuario: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      role: new FormControl(null),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales('password','password2') });
  }

  sonIguales(campo1:string, campo2:string){
    return (group:FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
       return (pass1===pass2)?null:{sonIguales:true};

    };
  }

  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }

    if(!this.forma.value.condiciones){
      Toast.fire({
        icon: 'error',
        title: 'Debe aceptar las condiciones'
      });
      return;
    }

    let usuario = new Usuario(
      this.forma.value.usuario,
      this.forma.value.password,
      1
    );
      this._usuarioService.crearUsuario(usuario).subscribe(resp=>this.router.navigate(['/login']));
  }
}
