import { Component, OnInit } from '@angular/core';
import { ParametrosService } from '../../../services/parametros/parametros.service';
import { LIMITE } from '../../../config/config';
import { Paciente } from '../../../models/historia/paciente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: [
  ]
})
export class PacientesComponent implements OnInit {

  limite='6';
  offset='0';
  buscar='';

  p:any=1;

  pacientes:Paciente[];
  totalPacientes:number;

  constructor(
    public _parametrosService:ParametrosService
  ) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(){
    this._parametrosService.cargar(this.limite, this.offset, this.buscar, 'pacientes').subscribe(
      pacientes => {
        this.totalPacientes=pacientes.total;
        this.pacientes = pacientes.pacientes;
      }
    );
  }

  verp(p:any){
    let limite=this.limite;
    let offset = (p-1)*(parseInt(limite));
    this.offset=offset.toString();
    this.cargar();
  }

}
