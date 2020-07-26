import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ventana } from '../../../models/configuraciones/ventanas.models';
import { ModalService } from '../../../services/settings/modal.service';
import { PermisosService } from '../../../services/settings/permisos.service';
import { HttpClient } from '@angular/common/http';
import { LIMITE } from '../../../config/config';


@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styles: []
})
export class PermisosComponent implements OnInit {

  ventana:Ventana = new Ventana();
  ventanas:Ventana[];
  vetanaSeleccionada:Ventana;
  totalVentanas:number;
  p:any=1;

  listo:Ventana=null;

  rowSelectedTable:any;

  limite=LIMITE;
  offset='0';
  buscar='';


  // @ViewChild('Acciones') acciones:Ventana;

  constructor(
    public _modalService:ModalService,
    public _permisosService:PermisosService,
    private _http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.getVentanas();
    this._modalService.notificarUpload.subscribe(()=>this.getVentanas());
  }

  getVentanas(){
    this._permisosService.cargarVentanas(this.limite, this.offset, this.buscar).subscribe(
      ventanas =>{
        this.totalVentanas=ventanas.total;
        this.ventanas=ventanas.ventanas;
      }
    )
  }

  verp(p:any){
    let limite=this.limite;
    let offset = (p-1)*(parseInt(limite));
    this.offset=offset.toString();
    this.getVentanas();
  }

  abrirModal(ventana:Ventana){
    // console.log(ventana);
    this.vetanaSeleccionada=ventana;
    this._modalService.abrirModalVentana("permiso");
    // this._modalService.abrirModal();
  }

  ventanaAcciones(child:any, ventana:Ventana){
    if(ventana){
      this.listo=ventana;
    }
    this.rowSelectedTable=child;
  }

}
