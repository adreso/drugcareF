import { Component, OnInit } from '@angular/core';
import { LIMITE } from '../../../config/config';
import { Propiedad } from '../../../models/parametros/propiedad.models';
import { ParametrosService } from '../../../services/parametros/parametros.service';
import { ModalService } from 'src/app/services/settings/modal.service';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styles: [
  ]
})
export class PropiedadesComponent implements OnInit {

 
  propiedad:Propiedad = new Propiedad();
  propiedades:Propiedad[];
  propiedadSeleccionada:Propiedad;
  p:any=1;
  totalPropiedad:number;
  limite=LIMITE;
  offset='0';
  buscar='';

  constructor(
    public _parametrosService:ParametrosService,
    public _modalService:ModalService
  ) { }

  ngOnInit(): void {
    this.cargar();
    this._modalService.notificarUpload.subscribe(()=>this.cargar());
  }

  abrirModal(propiedad:Propiedad){
    this.propiedadSeleccionada=propiedad;
    this._modalService.abrirModal();
  }

  cargar(){
    this._parametrosService.cargar(this.limite, this.offset, this.buscar, 'propiedades').subscribe(
      propiedades =>{
        this.totalPropiedad=propiedades.total;
        this.propiedades=propiedades.propiedades;
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
