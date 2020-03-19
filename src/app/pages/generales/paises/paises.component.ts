import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/generales/paises.service';
import {Paise} from './../../../models/generales/paises.models';
import { NgForm } from '@angular/forms';
import { Toast } from 'src/app/config/alertas';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {

  pais:Paise = new Paise();
  paises:Paise[];

  constructor(
    public _paisesService:PaisesService
  ) { }

  ngOnInit(): void {
    this.getPaises();
  }

  getPaises(){
    this._paisesService.cargarPaises().subscribe(
      paises =>{
        this.paises = paises;
        console.log(this.paises);
        // console.log(this.paises);

        // console.log(paises.pais);
      }
    );
  }

guardar(){
// console.log(this.pais);
this._paisesService.guardarMedico(this.pais).subscribe(
  resp =>{
    Toast.fire({icon:'success', title:'Pais guardado correctamente'})

    this.getPaises();
  }
)
}

}
