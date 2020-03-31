import { Component, Input, OnInit } from '@angular/core';
import { Ventana } from '../../../../models/configuraciones/ventanas.models';
import { Accione } from '../../../../models/configuraciones/acciones.model';
import { PermisosService } from '../../../../services/settings/permisos.service';
import { swalInfo } from '../../../../config/alertas';
import { ModalService } from 'src/app/services/settings/modal.service';

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
    public _modalService:ModalService
    ) {
    
   }
  ngOnInit(): void {
      
    this.getAcciones();
    this._modalService.notificarUpload.subscribe(()=>this.getAcciones());
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
           });
        }
      );
    }
}
abrirModal(accione:Accione){
  this.AccionSeleccionada=accione;
  this._modalService.abrirModal();
}

verp(pe:any){
  let limite=this.limite;
  let offset = (pe-1)*(parseInt(limite));
  this.offset=offset.toString();
  this.getAcciones();
}

verObservaciones(acciones:Accione){
  swalInfo(acciones.observacion, 'Observaciones', 'Entendido');
}

}
