import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/settings/modal.service';
import { ParametrosService } from '../../../../services/parametros/parametros.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { GrupoTerapeutico } from '../../../../models/parametros/grupoTerapeutico.models';
import { configMessagesValidator, resetearForma } from '../../../../config/messageValidators';
import { Toast, ToastErrores } from '../../../../config/alertas';

@Component({
  selector: 'app-form-grupoterapeutico',
  templateUrl: './form-grupoterapeutico.component.html',
  styles: [
  ]
})
export class FormGrupoterapeuticoComponent implements OnInit {

  @Input() grupoTerapeutico:GrupoTerapeutico;
  @ViewChild("descripcion") nombreField:ElementRef;

  thisForm:FormGroup;

  constructor(
    public _modalService:ModalService,
    public _parametrosService:ParametrosService,
    private rxFB:RxFormBuilder
  ) { }


  ngOnInit(): void {
    let thisForm=new GrupoTerapeutico();
    this.thisForm = this.rxFB.formGroup(thisForm);
    configMessagesValidator();
    setTimeout(() => {
      this.focusNombre();
    });
  }
  ngOnChanges(): void {
    setTimeout(() => {
      this.thisForm.patchValue(this.grupoTerapeutico);
    });
  }
  guardar(){
    if(this.grupoTerapeutico){
      this.thisForm.value.id=this.grupoTerapeutico.id;
    }
    if(this.thisForm.valid){
      this._parametrosService.guardar(this.thisForm.value, 'gruposterapeuticos').subscribe(
        (grupoTerapeutico:GrupoTerapeutico) =>{
          Toast.fire({icon:'success', title:`GrupoTerapeutico guardado correctamente`});
          this._modalService.notificarUpload.emit(this.grupoTerapeutico);
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
