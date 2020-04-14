import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PaisesService } from 'src/app/services/generales/paises.service';
import {Paise} from './../../../models/generales/paises.models';
import { ModalService } from 'src/app/services/settings/modal.service';
import { LIMITE } from '../../../config/config';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {

  pais:Paise = new Paise();
  paises:Paise[];
  paisSeleccionado:Paise;
  p:any=1;
  totalPaises:number;
  limite=LIMITE;
  offset='0';
  buscar='';

  constructor(
    public _paisesService:PaisesService,
    public _modalService:ModalService
  ) {

  }

  ngOnInit(): void {
    this.getPaises();
    this._modalService.notificarUpload.subscribe(()=>this.getPaises());
  }



  getPaises(){
    this._paisesService.cargarPaises(this.limite, this.offset, this.buscar).subscribe(
      paises => {
        this.totalPaises=paises.total;
        this.paises = paises.paises;
      }
      );
  }

  abrirModal(pais:Paise){
    this.paisSeleccionado=pais;
    this._modalService.abrirModal();
  }


  verp(p:any){
    let limite=this.limite;
    let offset = (p-1)*(parseInt(limite));
    this.offset=offset.toString();
    this.getPaises();
  }

}

