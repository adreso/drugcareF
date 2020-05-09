import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Propiedad } from '../../../../models/parametros/propiedad.models';
import { FormGroup } from '@angular/forms';
import { ParametrosService } from '../../../../services/parametros/parametros.service';
import { ModalService } from 'src/app/services/settings/modal.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { configMessagesValidator, resetearForma } from '../../../../config/messageValidators';
import { Toast, ToastErrores } from '../../../../config/alertas';
import { CategoriaPropiedadesMedicamentos } from '../../../../config/enums';

@Component({
  selector: 'app-form-propiedades',
  templateUrl: './form-propiedades.component.html',
  styles: [
  ]
})
export class FormPropiedadesComponent implements OnInit {

 
  @Input() propiedad:Propiedad;
  @ViewChild("descripcion") nombreField:ElementRef;
  
  propiedadForm:FormGroup;

  public keyCategoriaId = Object.values(CategoriaPropiedadesMedicamentos);

  constructor(
    public _modalService:ModalService,
    public _parametrosService:ParametrosService,
    private rxFB:RxFormBuilder
  ) { }


  ngOnInit(): void {
    let propiedadForm=new Propiedad();
    this.propiedadForm = this.rxFB.formGroup(propiedadForm);
    configMessagesValidator();
    setTimeout(() => {
      this.focusNombre();  
    });
  }
  ngOnChanges(): void {
    setTimeout(() => {
      this.propiedadForm.patchValue(this.propiedad);
    });    
  }
  guardar(){
    if(this.propiedad){
      this.propiedadForm.value.id=this.propiedad.id;
    }
    if(this.propiedadForm.valid){
      this._parametrosService.guardar(this.propiedadForm.value, 'propiedades').subscribe(
        (propiedad:Propiedad) =>{
          Toast.fire({icon:'success', title:`Propiedad guardado correctamente`});
          this._modalService.notificarUpload.emit(this.propiedad);
          this.cerrarModal();
          resetearForma(this.propiedadForm)
          
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
