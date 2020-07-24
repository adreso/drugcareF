import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Enfermedad } from '../../../../models/parametros/enfermedades.models';
import { LIMITE } from '../../../../config/config';
import { ParametrosService } from '../../../../services/parametros/parametros.service';
import { HttpClient } from '@angular/common/http';
import { TipoParaclinico } from '../../../../models/parametros/tipoparaclinicos.models';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { RxFormGroup, RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { swalConfirm, Toast, ToastErrores } from '../../../../config/alertas';

@Component({
  selector: 'app-enfermedades-paraclinicos',
  templateUrl: './enfermedades-paraclinicos.component.html',
  styles: [
  ]
})
export class EnfermedadesParaclinicosComponent implements OnInit {

  //combo Typeahead
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.paraclinicos
        : this.paraclinicos.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  formatter = (x: {nombre: string}) => x.nombre;
  buscarCombo='';
// fin combo Typeahead

paraclinicoForm:RxFormGroup;


  paraclinicos:TipoParaclinico[];

  @Input() enfermedad:Enfermedad;

  enfermedadesParaclinico:TipoParaclinico = new TipoParaclinico();
  tipoParaclinicos:TipoParaclinico[];
  enfermedadParaclinicoSeleccionada:TipoParaclinico;
  totalEnfermedadParaclinicos:number;
  pe:any=1;

  limite=LIMITE;
  offset='0';
  buscar='';

  constructor(
    public _parametrosServices:ParametrosService,
    public http:HttpClient,
    private fb: RxFormBuilder,
    public _parametrosService:ParametrosService
    ) {}

  ngOnInit(): void {

    this.paraclinicoForm = <RxFormGroup>this.fb.group({
      tipoparaclinico:['', RxwebValidators.required()]
    },
      {abstractControlOptions: {tipoparaclinico:'blur'}}
    );

    this.getParaclinicosEnfermedad();
    setTimeout(() => {
      this.onFormsChanges();
    });
    this.getParaclinicos(this.buscarCombo);
  }

  ngOnChanges(): void {
    this.getParaclinicosEnfermedad();
  }

  getParaclinicosEnfermedad(){
    if(this.enfermedad){
      this._parametrosServices.cargar(this.limite, this.offset, this.buscar, "enfermedades/paraclinicos/"+this.enfermedad.id).subscribe(
        enfermedades =>{
          setTimeout(()=>{
            this.totalEnfermedadParaclinicos=enfermedades.total;
            this.tipoParaclinicos=enfermedades.enfermedades[0].tipoparaclinicos;
          });
        }
      );
    }
}

verp(pe:any){
  let limite=this.limite;
  let offset = (pe-1)*(parseInt(limite));
  this.offset=offset.toString();
  this.getParaclinicosEnfermedad();
}

onFormsChanges(){
  this.paraclinicoForm.get('tipoparaclinico').valueChanges.subscribe(val => {
    if (typeof(val) === 'string') {
      const empFinded = this.paraclinicos.find(x =>
          (x.nombre.toUpperCase()) === val.toUpperCase() || x.nombre.toUpperCase() === val.toUpperCase());
      this.paraclinicoForm.get('tipoparaclinico').patchValue(empFinded);
    }
  });

}

getParaclinicos(buscar:string){
  this._parametrosService.cargar('5', '0', buscar, 'tipoparaclinicos').subscribe(
    tipoparaclinicos =>{
      this.paraclinicos=tipoparaclinicos.tipoparaclinicos;
    }
  )
}
agregar(){
  if(this,this.paraclinicoForm.invalid){
    return Toast.fire({icon:'warning', title:`Debe seleccionar un paraclinico`});
  }
  // if(this.paraclinicoForm.valid){
    this.paraclinicoForm.value.enfermedad=this.enfermedad;
    this._parametrosService.guardar(this.paraclinicoForm.value, 'enfermedades/paraclinicos').subscribe(
      paraclinico =>{
        Toast.fire({icon:'success', title:`Paraclinico agregado correctamente`});
        this.getParaclinicosEnfermedad();
      },
      err =>ToastErrores(err)
    );
  // }
}

anular(idparaclinico){
  swalConfirm('¿Esta seguro que desea anular este paraclinico?', 'Se quitará la asociación de esta enfermedad!').then(
    (resultado) =>{
      if(resultado.value){

        Toast.fire({icon:'success', title:`Paraclinico anulado correctamente`});
      }
    }
  )
}
}
