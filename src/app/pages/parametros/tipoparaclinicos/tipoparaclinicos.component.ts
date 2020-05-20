import { Component, OnInit } from '@angular/core';
import { TipoParaclinico } from '../../../models/parametros/tipoparaclinicos.models';
import { LIMITE } from '../../../config/config';
import { ParametrosService } from '../../../services/parametros/parametros.service';
import { ModalService } from '../../../services/settings/modal.service';

@Component({
  selector: 'app-tipoparaclinicos',
  templateUrl: './tipoparaclinicos.component.html',
  styles: [
  ]
})
export class TipoparaclinicosComponent implements OnInit {

  tipoParaclinico:TipoParaclinico = new TipoParaclinico();
  tipoparaclinicos:TipoParaclinico[];
  tipoParaclinicoSeleccionado:TipoParaclinico;
  p:any=1;
  totalTiposParaclinicos:number;
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

  abrirModal(tipoParaclinico:TipoParaclinico){
    this.tipoParaclinicoSeleccionado=tipoParaclinico;
    this._modalService.abrirModal();
  }

  cargar(){
    this._parametrosService.cargar(this.limite, this.offset, this.buscar, 'tipoparaclinicos').subscribe(
      tipoparaclinicos =>{
        this.totalTiposParaclinicos=tipoparaclinicos.total;
        this.tipoparaclinicos=tipoparaclinicos.tipoparaclinicos;
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
