import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/generales/paises.service';
import {Paise} from './../../../models/generales/paises.models';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {

  pais:any;

  constructor(
    public _paisesService:PaisesService
  ) { }

  ngOnInit(): void {
    this.getPaises();
  }

  getPaises(){
    this._paisesService.cargarHospitales().subscribe(
      paises =>{
        // this.pais=paises.pais;
        console.log(paises);
        // console.log(paises.pais);
      }
    );
  }

}
