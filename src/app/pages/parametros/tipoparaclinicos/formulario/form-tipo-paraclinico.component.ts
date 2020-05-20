import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TipoParaclinico } from '../../../../models/parametros/tipoparaclinicos.models';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/settings/modal.service';
import { ParametrosService } from '../../../../services/parametros/parametros.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { configMessagesValidator, resetearForma } from '../../../../config/messageValidators';
import { Toast, ToastErrores } from '../../../../config/alertas';

@Component({
  selector: 'app-form-tipo-paraclinico',
  templateUrl: './form-tipo-paraclinico.component.html',
  styles: [
  ]
})
export class FormTipoParaclinicoComponent implements OnInit {

  @Input() tipoParaclinico:TipoParaclinico;
  @ViewChild("nombre") nombreField:ElementRef;

  thisForm:FormGroup;

  constructor(
    public _modalService:ModalService,
    public _parametrosService:ParametrosService,
    private rxFB:RxFormBuilder
  ) { }


  ngOnInit(): void {
    let thisForm=new TipoParaclinico();
    this.thisForm = this.rxFB.formGroup(thisForm);
    configMessagesValidator();
    setTimeout(() => {
      this.focusNombre();
    });
  }
  ngOnChanges(): void {
    setTimeout(() => {
      this.thisForm.patchValue(this.tipoParaclinico);
    });
  }
  guardar(){
    if(this.tipoParaclinico){
      this.thisForm.value.id=this.tipoParaclinico.id;
    }
    if(this.thisForm.valid){
      this._parametrosService.guardar(this.thisForm.value, 'tipoparaclinicos').subscribe(
        (tipoparaclinico:TipoParaclinico) =>{
          Toast.fire({icon:'success', title:`Tipo de paraclinico guardado correctamente`});
          this._modalService.notificarUpload.emit(this.tipoParaclinico);
          this.cerrarModal();
          resetearForma(this.thisForm);

        },
        err =>ToastErrores(err)
      );
      }else{
        Toast.fire({icon:'warning', title:`Debe llenar todos los campos requeridos del formulario`});
      }

  }

  cerrarModal(){
    this._modalService.cerrarModal();
    this._modalService.notificarUpload.emit(false);

  }

  focusNombre():void{
    this.nombreField.nativeElement.focus();
  }

}
