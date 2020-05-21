import { Component, OnInit } from '@angular/core';
import { TipoHorario } from '../../../models/parametros/tipohorarios.models';
import { LIMITE } from '../../../config/config';
import { ParametrosService } from '../../../services/parametros/parametros.service';
import { ModalService } from '../../../services/settings/modal.service';

@Component({
  selector: 'app-tipohorarios',
  templateUrl: './tipohorarios.component.html',
  styles: [
  ]
})
export class TipohorariosComponent implements OnInit {

  tipoHorario:TipoHorario = new TipoHorario();
  tipohorarios:TipoHorario[];
  tipoHorarioSeleccionado:TipoHorario;
  p:any=1;
  totalTipoHorario:number;
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

  abrirModal(tipoHorario:TipoHorario){
    this.tipoHorarioSeleccionado=tipoHorario;
    this._modalService.abrirModal();
  }

  cargar(){
    this._parametrosService.cargar(this.limite, this.offset, this.buscar, 'tipohorarios').subscribe(
      tipohorarios =>{
        this.totalTipoHorario=tipohorarios.total;
        this.tipohorarios=tipohorarios.tipohorarios;
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
