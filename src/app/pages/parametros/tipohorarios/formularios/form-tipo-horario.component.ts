import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TipoHorario } from '../../../../models/parametros/tipohorarios.models';
import { ModalService } from '../../../../services/settings/modal.service';
import { ParametrosService } from '../../../../services/parametros/parametros.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { configMessagesValidator, resetearForma } from '../../../../config/messageValidators';
import { Toast, ToastErrores } from '../../../../config/alertas';

@Component({
  selector: 'app-form-tipo-horario',
  templateUrl: './form-tipo-horario.component.html',
  styles: [
  ]
})
export class FormTipoHorarioComponent implements OnInit {

  @Input() tipoHorario:TipoHorario;
  @ViewChild("descripcion") nombreField:ElementRef;

  thisForm:FormGroup;

  constructor(
    public _modalService:ModalService,
    public _parametrosService:ParametrosService,
    private rxFB:RxFormBuilder
  ) { }


  ngOnInit(): void {
    let thisForm=new TipoHorario();
    this.thisForm = this.rxFB.formGroup(thisForm);
    configMessagesValidator();
    setTimeout(() => {
      this.focusNombre();
    });
  }
  ngOnChanges(): void {
    setTimeout(() => {
      this.thisForm.patchValue(this.tipoHorario);
    });
  }
  guardar(){
    if(this.tipoHorario){
      this.thisForm.value.id=this.tipoHorario.id;
    }
    if(this.thisForm.valid){
      this._parametrosService.guardar(this.thisForm.value, 'tipohorarios').subscribe(
        (tipoHorario:TipoHorario) =>{
          Toast.fire({icon:'success', title:`Tipo de horario guardado correctamente`});
          this._modalService.notificarUpload.emit(this.tipoHorario);
          this.cerrarModal();
          resetearForma(this.thisForm)

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
