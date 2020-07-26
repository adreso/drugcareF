import { Injectable, EventEmitter } from '@angular/core';
export class VentanasAbiertas
{
  nombre:string;
  estado:boolean;
}
@Injectable({
  providedIn: 'root'
})

export class ModalService {

  modal:boolean = false;
  ventanasAbiertas:VentanasAbiertas[] = [];

  private _notificarUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }

  abrirModal(){
    this.modal = true;
  }

  abrirModalVentana(nombre:string){
    let ventana = this.ventanasAbiertas.find(x => x.nombre === nombre);
    if(ventana){
      ventana.estado=true;
    }else{
      ventana = new VentanasAbiertas();
      ventana.estado=true;
      ventana.nombre=nombre;
      this.ventanasAbiertas.push(ventana)
    }
    console.log(ventana);
  }

  cerrarModalVentana(nombre:string){
    let ventana = this.ventanasAbiertas.find(x => x.nombre === nombre);
    if(ventana){
      ventana.estado=false;
      this._notificarUpload;
    }
  }

  estaAbierta(nombre:string):boolean{
    let ventana = this.ventanasAbiertas.find(x => x.nombre === nombre);
    return ventana?ventana.estado:false;
  }

  cerrarModal(){
    this.modal = false;
    this._notificarUpload;
  }
}
