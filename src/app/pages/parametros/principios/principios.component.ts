import { Component, OnInit } from '@angular/core';
import { Principio } from '../../../models/parametros/principio.models';
import { LIMITE } from '../../../config/config';
import { PrincipioService } from '../../../services/parametros/principio.service';
import { ModalService } from 'src/app/services/settings/modal.service';

@Component({
  selector: 'app-principios',
  templateUrl: './principios.component.html',
  styles: [
  ]
})
export class PrincipiosComponent implements OnInit {

  principio:Principio = new Principio();
  principios:Principio[];
  principioSeleccionado:Principio;
  p:any=1;
  totalPrincipios:number;
  limite=LIMITE;
  offset='0';
  buscar='';

  constructor(
    public _principioService:PrincipioService,
    public _modalService:ModalService
  ) { }

  ngOnInit(): void {
    this.cargar();
    this._modalService.notificarUpload.subscribe(()=>this.cargar());
  }

  abrirModal(principio:Principio){
    this.principioSeleccionado=principio;
    this._modalService.abrirModal();
  }

  cargar(){
    this._principioService.cargar(this.limite, this.offset, this.buscar).subscribe(
      principios =>{
        this.totalPrincipios=principios.total;
        this.principios=principios.principios;
      }
    )
  }

  verp(p:any){
    let limite=this.limite;
    let offset = (p-1)*(parseInt(limite));
    this.offset=offset.toString();
    this.cargar();
  }




}
