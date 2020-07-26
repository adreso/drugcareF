import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Accione } from '../../../../../models/configuraciones/acciones.model';
import { ModalService } from 'src/app/services/settings/modal.service';
import { PermisosService } from '../../../../../services/settings/permisos.service';
import { Toast, ToastErrores } from '../../../../../config/alertas';
import { Ventana } from '../../../../../models/configuraciones/ventanas.models';

@Component({
  selector: 'app-form-accione',
  templateUrl: './form-accione.component.html',
  styles: []
})
export class FormAccioneComponent implements OnInit {

  @Input() accione:Accione;
  @Input() ventana:Ventana;
  @ViewChild('observacion') Field:ElementRef;

  constructor(
    public _modalService:ModalService,
    public _permisoService:PermisosService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.focus();
  });
  }

  // cerrarModal(){
  //   this._modalService.cerrarModal();
    //  this._modalService.notificarUpload.emit(false);
  // }

  cerrarModal(){
    this._modalService.cerrarModalVentana("accione");
  }
  guardar(){
    // console.log(this.accione);
    // if(!this.accione.id){
      this.accione.ventana=this.ventana;
    // }
    this._permisoService.guardarAccione(this.accione).subscribe(
      (accione:any) =>{
        this._modalService.notificarUpload.emit(this.accione);
        this.cerrarModal();
        this.accione=new Accione();
        Toast.fire({icon:'success', title:`Ventana ${accione.accion} guardada correctamente`});
      },
        err=>ToastErrores(err)
      );
  }

  focus(){}
  //   setTimeout(()=>{

  //     this.Field.nativeElement.focus();
  //   })
  // }
}
