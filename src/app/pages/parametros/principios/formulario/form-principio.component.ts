import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Principio } from '../../../../models/parametros/principio.models';
import { ModalService } from 'src/app/services/settings/modal.service';
import { PrincipioService } from '../../../../services/parametros/principio.service';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { configMessagesValidator, resetearForma } from '../../../../config/messageValidators';
import { Toast, ToastErrores } from '../../../../config/alertas';

@Component({
  selector: 'app-form-principio',
  templateUrl: './form-principio.component.html',
  styles: [
  ]
})
export class FormPrincipioComponent implements OnInit {

  @Input() principio:Principio;
  @ViewChild("nombre") nombreField:ElementRef;
  
  principioForm:FormGroup;

  constructor(
    public _modalService:ModalService,
    public _principiosService:PrincipioService,
    private rxFB:RxFormBuilder
  ) { }


  ngOnInit(): void {
    // let principioForm:Principio=this.principio;
    let principioForm=new Principio();
    this.principioForm = this.rxFB.formGroup(principioForm);
    configMessagesValidator();
    setTimeout(() => {
      this.focusNombre();  
    });
  }
  ngOnChanges(): void {
    setTimeout(() => {
      this.principioForm.patchValue(this.principio);
    });    
  }
  guardar(){
    if(this.principio){
      this.principioForm.value.id=this.principio.id;
    }
    if(this.principioForm.valid){
      this._principiosService.guardar(this.principioForm.value).subscribe(
        (principio:Principio) =>{
          Toast.fire({icon:'success', title:`Principio guardado correctamente`});
          this._modalService.notificarUpload.emit(this.principio);
          this.cerrarModal();
          resetearForma(this.principioForm)
          
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
