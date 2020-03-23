import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PaisesService } from 'src/app/services/generales/paises.service';
import {Paise} from './../../../models/generales/paises.models';
import { ModalService } from 'src/app/services/settings/modal.service';
import { FormPaisComponent } from './formulario/form-pais.component';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {

  pais:Paise = new Paise();
  paises:Paise[];
  paisSeleccionado:Paise;
  totalPaises:number;
  p:any=1;

  limite='10';
  offset='0';

  constructor(
    public _paisesService:PaisesService,
    public _modalService:ModalService
  ) {

  }

  ngOnInit(): void {
    this.getPaises(this.limite, this.offset);
    this._modalService.notificarUpload.subscribe(resp=>{
      this.getPaises(this.limite, this.offset);
    })
  }



  getPaises(limite='10', offset='0'){
    this._paisesService.cargarPaises(limite, offset).subscribe(
      paises =>{
        this.paises = paises;
        // console.log(this.paises);

        // console.log(paises.pais);
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
    this.getPaises(this.limite, this.offset.toString());
  }



}

