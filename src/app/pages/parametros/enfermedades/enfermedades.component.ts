import { Component, OnInit } from '@angular/core';
import { Enfermedad } from '../../../models/parametros/enfermedades.models';
import { LIMITE } from '../../../config/config';
import { ParametrosService } from '../../../services/parametros/parametros.service';
import { ModalService } from '../../../services/settings/modal.service';

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styles: [
  ]
})
export class EnfermedadesComponent implements OnInit {


  enfermedad:Enfermedad = new Enfermedad();
  enfermedades:Enfermedad[];
  enfermedadSeleccioanda:Enfermedad;
  p:any=1;
  totalEnfermedades:number;
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

  abrirModal(enfermedad:Enfermedad){
    this.enfermedadSeleccioanda=enfermedad;
    this._modalService.abrirModal();
  }

  cargar(){
    this._parametrosService.cargar(this.limite, this.offset, this.buscar, 'enfermedades').subscribe(
      enfermedades =>{
        this.totalEnfermedades=enfermedades.total;
        this.enfermedades=enfermedades.enfermedades;
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
