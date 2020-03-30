import { Component, Input, OnInit, SimpleChanges, SimpleChange, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Ventana } from '../../../../models/configuraciones/ventanas.models';
import { Accione } from '../../../../models/configuraciones/acciones.model';
import { PermisosService } from '../../../../services/settings/permisos.service';
import { swalInfo } from '../../../../config/alertas';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styles: []
})
export class AccionesComponent implements OnInit {
  
  @Input() ventana:Ventana;

  accione:Accione = new Accione();
  acciones:Accione[];
  AccionSeleccionada:Accione;
  totalAcciones:number;
  pe:any=1;

  limite='10';
  offset='0';
  buscar='';

  constructor(
    public _permisosService:PermisosService,
    private cdr: ChangeDetectorRef
    ) {
    
   }
  ngOnInit(): void {
      

  }

  ngOnChanges(): void {
     this.getAcciones();
  }
 
  getAcciones(){
    if(this.ventana){
      this._permisosService.cargarAcciones(this.limite, this.offset, this.buscar, this.ventana).subscribe(
        acciones =>{    
          setTimeout(()=>{
            this.totalAcciones=acciones.total;
            this.acciones=acciones.acciones;
           })
          //  this.cdr.detectChanges();
        }
      );
    }
}
abrirModal(accione:Accione){

}

verp(p:any){
  let limite=this.limite;
  let offset = (p-1)*(parseInt(limite));
  this.offset=offset.toString();
  this.getAcciones();
  this.cdr.detectChanges();
}

verObservaciones(acciones:Accione){
  swalInfo(acciones.observacion, 'Observaciones', 'Entendido');
}

}
