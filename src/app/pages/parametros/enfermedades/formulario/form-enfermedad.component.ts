import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Enfermedad } from '../../../../models/parametros/enfermedades.models';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/settings/modal.service';
import { ParametrosService } from '../../../../services/parametros/parametros.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { configMessagesValidator, resetearForma } from '../../../../config/messageValidators';
import { Toast, ToastErrores } from '../../../../config/alertas';
import { Sexo } from '../../../../config/enums';

@Component({
  selector: 'app-form-enfermedad',
  templateUrl: './form-enfermedad.component.html',
  styles: [
  ]
})
export class FormEnfermedadComponent implements OnInit {

  @Input() enfermedad:Enfermedad;
  @ViewChild("codigo") nombreField:ElementRef;

  thisForm:FormGroup;

  public keySexo = Object.values(Sexo);

  constructor(
    public _modalService:ModalService,
    public _parametrosService:ParametrosService,
    private rxFB:RxFormBuilder
  ) { }


  ngOnInit(): void {
    let thisForm=new Enfermedad();
    this.thisForm = this.rxFB.formGroup(thisForm);
    configMessagesValidator();
    setTimeout(() => {
      this.focusNombre();
    });
  }
  ngOnChanges(): void {
    setTimeout(() => {
      this.thisForm.patchValue(this.enfermedad);
    });
  }
  guardar(){
    if(this.enfermedad){
      this.thisForm.value.id=this.enfermedad.id;
    }
    if(this.thisForm.valid){
      this._parametrosService.guardar(this.thisForm.value, 'enfermedades').subscribe(
        (enfermedad:Enfermedad) =>{
          Toast.fire({icon:'success', title:`Enfermedad guardada correctamente`});
          this._modalService.notificarUpload.emit(this.enfermedad);
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
