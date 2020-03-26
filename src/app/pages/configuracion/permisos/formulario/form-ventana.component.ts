import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Ventana } from '../../../../models/configuraciones/ventanas.models';
import { ModalService } from '../../../../services/settings/modal.service';
import { PermisosService } from '../../../../services/settings/permisos.service';
import { Toast } from '../../../../config/alertas';

@Component({
  selector: 'app-form-ventana',
  templateUrl: './form-ventana.component.html',
  styles: []
})
export class FormVentanaComponent implements OnInit {
  
  @Input() ventana:Ventana;
  @ViewChild("descripcion") Field: ElementRef;
  

  constructor(
    public _modalService:ModalService,
    public _permisoService:PermisosService
  ) { 
    
  }

  ngOnInit(): void {
    // this.ventana.estado=true;
    setTimeout(() => {
      this.focus();
  });
  }

  cerrarModal(){
    this._modalService.cerrarModal();
    this._modalService.notificarUpload.emit(false);
  }

  guardar(){
    console.log(this.ventana);
    this._permisoService.guardarVentana(this.ventana).subscribe(
      resp =>{
        this._modalService.notificarUpload.emit(this.ventana);
        this.cerrarModal();
        this.ventana=new Ventana();
        Toast.fire({icon:'success', title:'Ventana guardada correctamente'});
      }
    );
  }

  focus(){
      this.Field.nativeElement.focus();
  }
}
