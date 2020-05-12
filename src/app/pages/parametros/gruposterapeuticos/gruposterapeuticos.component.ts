import { Component, OnInit } from '@angular/core';
import { LIMITE } from '../../../config/config';
import { GrupoTerapeutico } from '../../../models/parametros/grupoTerapeutico.models';
import { ParametrosService } from '../../../services/parametros/parametros.service';
import { ModalService } from 'src/app/services/settings/modal.service';

@Component({
  selector: 'app-gruposterapeuticos',
  templateUrl: './gruposterapeuticos.component.html',
  styles: [
  ]
})
export class GruposterapeuticosComponent implements OnInit {

  grupoTerapeutico:GrupoTerapeutico = new GrupoTerapeutico();
  gruposterapeuticos:GrupoTerapeutico[];
  grupoTerapeuticoSeleccionado:GrupoTerapeutico;
  p:any=1;
  totalGruposTerapeuticos:number;
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

  abrirModal(grupoTerapeutico:GrupoTerapeutico){
    this.grupoTerapeuticoSeleccionado=grupoTerapeutico;
    this._modalService.abrirModal();
  }

  cargar(){
    this._parametrosService.cargar(this.limite, this.offset, this.buscar, 'gruposterapeuticos').subscribe(
      gruposterapeuticos =>{
        this.totalGruposTerapeuticos=gruposterapeuticos.total;
        this.gruposterapeuticos=gruposterapeuticos.gruposterapeuticos;
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
