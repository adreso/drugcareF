import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Principio } from '../../../../models/parametros/principio.models';
import { ModalService } from 'src/app/services/settings/modal.service';
import { ParametrosService } from '../../../../services/parametros/parametros.service';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder, RxFormGroup, RxwebValidators } from '@rxweb/reactive-form-validators';
import { configMessagesValidator, resetearForma } from '../../../../config/messageValidators';
import { Toast, ToastErrores } from '../../../../config/alertas';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { GrupoTerapeutico } from '../../../../models/parametros/grupoTerapeutico.models';

@Component({
  selector: 'app-form-principio',
  templateUrl: './form-principio.component.html',
  styles: [
  ]
})
export class FormPrincipioComponent implements OnInit {

// combo Typeahead
search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.gruposTerapeuticos.filter(v => v.descripcion.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
formatter = (x: {descripcion: string}) => x.descripcion;
buscarCombo='';
// fin combo Typeahead

  @Input() principio:Principio;
  @ViewChild("nombre") nombreField:ElementRef;

  gruposTerapeuticos:GrupoTerapeutico[];
  principioForm:FormGroup;

  constructor(
    public _modalService:ModalService,
    public _parametrosService:ParametrosService,
    private rxFB:RxFormBuilder
  ) { }


  ngOnInit(): void {
    let principioForm=new Principio();
    principioForm.grupoterpeutico= new GrupoTerapeutico();
    this.principioForm = this.rxFB.formGroup(principioForm);
    configMessagesValidator();
    setTimeout(() => {
      this.focusNombre();
    });
    this.getGrupoTerapeutico(this.buscarCombo);
  }
  ngOnChanges(): void {
    setTimeout(() => {
      this.principioForm.patchValue(this.principio);
    });
  }

  getGrupoTerapeutico(buscar:string){
    this._parametrosService.cargar('5', '0', buscar, 'gruposterapeuticos').subscribe(
      gruposterapeuticos =>{
        this.gruposTerapeuticos=gruposterapeuticos.gruposterapeuticos;
      }
    )
  }

  guardar(){
    if(this.principio){
      this.principioForm.value.id=this.principio.id;
    }
    if(this.principioForm.valid){
      this._parametrosService.guardar(this.principioForm.value, 'principios').subscribe(
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
