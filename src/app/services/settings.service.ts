import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  tipo:string;
  variable:string;
  cambiar:boolean=false;
  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes(){
    localStorage.setItem('ajustes', this.tipo+":"+this.variable);
  }

  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.tipo=localStorage.getItem('ajustes').split(':')[0];
      this.variable=localStorage.getItem('ajustes').split(':')[1];
      this.aplicarAjustes();
    console.log('cargando el local storage' + 'variable'+localStorage.getItem('ajustes').split(':')[1]);
    }else{
      console.log('no cargo nada');
    }
  }

  aplicarAjustes(){
     this.tipo="border-bottom-0";
     this.variable="main-header";

     this.cambiar=!this.cambiar;

     if(this.cambiar){
      //  this._document.getElementsByClassName('main-header')[0].classList.add('border-bottom-0');
     }
    // }else{
    //   this._document.getElementsByClassName("main-header")[0].classList.remove("border-bottom-0");
    // }

  }
}
