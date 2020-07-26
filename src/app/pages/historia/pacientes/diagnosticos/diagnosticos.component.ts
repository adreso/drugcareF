
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ParametrosService } from 'src/app/services/parametros/parametros.service';
import { Diagnostico } from 'src/app/models/historia/diagnostico.model';
import { Subject, Observable, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Enfermedad } from 'src/app/models/parametros/enfermedades.models';
import { RxFormGroup, RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { Toast, ToastErrores } from 'src/app/config/alertas';
import { Paciente } from 'src/app/models/historia/paciente.model';




@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styles: [
  ]
})
export class DiagnosticosComponent implements OnInit {

//combo Typeahead
@ViewChild('instance', {static: true}) instance: NgbTypeahead;
focus$ = new Subject<string>();
click$ = new Subject<string>();

search = (text$: Observable<string>) => {
  const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
  const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
  const inputFocus$ = this.focus$;

  

  return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
    map(term => (term === '' ? this.enfermedades
      : this.enfermedades.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
  );
}
formatter = (x: {nombre: string}) => x.nombre;
buscarCombo='';
// fin combo Typeahead

  @Input() paciente:Paciente;
  estado='1';
  enfermedad_diag:any[];
  enfermedades:Enfermedad[];
  
  thisForm:RxFormGroup;
  buscar='';

  constructor(
     private _parametrosService:ParametrosService,
     private fb:RxFormBuilder


  ) { }

  ngOnInit(): void {
  this.cargarEnfermedades();
  
  this.thisForm = <RxFormGroup>this.fb.group({
    enfermedades:['', RxwebValidators.required()]
  },
    {abstractControlOptions: {enfermedades:'blur'}}
  );

  
  setTimeout(() => {
    this.onFormsChanges();
  });
  this.cargarCombo(this.buscar); 

  }

  ngOnChanges():void{
    this.cargarEnfermedades();
  }

  agregar(){
    if(this,this.thisForm.invalid){
      return Toast.fire({icon:'warning', title:`Debe seleccionar una enfermedad`});
    }
    // if(this.thisForm.valid){
      this.thisForm.value.paciente=this.paciente;
      this._parametrosService.guardar(this.thisForm.value, 'diagnosticos').subscribe(
        paraclinico =>{
          Toast.fire({icon:'success', title:`Enfermedad agregada correctamente`});
          this.cargarEnfermedades();
        },
        err =>ToastErrores(err)
      );
  }

  cargarEnfermedades(){
    this._parametrosService.cargarConEstado('diagnosticos/'+this.paciente.id,this.estado)
    .subscribe(diagnosticos => {
           this.enfermedad_diag= diagnosticos;
           console.log(diagnosticos);
    })
  }


  cargarCombo(busca:string){
    this._parametrosService.cargar('5','0', busca, 'enfermedades').subscribe(
      enfermedades =>{
       
        this.enfermedades=enfermedades.enfermedades;
      }
    )
  }

  onFormsChanges(){
    this.thisForm.get('enfermedades').valueChanges.subscribe(val => {
      if (typeof(val) === 'string') {
        const empFinded = this.enfermedades.find(x =>
            (x.nombre.toUpperCase()) === val.toUpperCase() || x.nombre.toUpperCase() === val.toUpperCase());
        this.thisForm.get('enfermedades').patchValue(empFinded);
      }
    });
  
  }


}
