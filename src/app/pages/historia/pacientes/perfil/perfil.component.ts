import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParametrosService } from '../../../../services/parametros/parametros.service';
import { Paciente } from '../../../../models/historia/paciente.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  paciente:Paciente=new Paciente();
  
  constructor(
    private route: ActivatedRoute,
    private _parametrosService:ParametrosService
  ) { }

  ngOnInit(): void {
    this.cargar();
  
  }

  cargar(){
    this._parametrosService.cargarIndividual('pacientes/perfil/'+this.route.snapshot.paramMap.get("id")).subscribe(
      paciente => {
        this.paciente=paciente;
      }
    );
  }
}
