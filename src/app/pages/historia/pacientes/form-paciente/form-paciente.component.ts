import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../../../../models/historia/paciente.model';
import { ParametrosService } from '../../../../services/parametros/parametros.service';
import { RxFormBuilder, RxFormGroup, RxwebValidators, NumericValueType } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { configMessagesValidator } from '../../../../config/messageValidators';
import { TiposID, Sexo } from '../../../../config/enums';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Role } from '../../../../models/configuraciones/roles.model';
import { Tercero } from '../../../../models/generales/terceros.models';
import { Toast, ToastErrores } from '../../../../config/alertas';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { UsuariosService } from '../../../../services/generales/usuarios.service';
import { PacientesService } from '../../../../services/historia/pacientes.service';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styles: [
  ]
})
export class FormPacienteComponent implements OnInit {



  identificacionEncontrada:boolean=true;
  emailEncontrado:boolean=true;
  usuarioEncontrado:boolean=true;

  public keyTipoId = Object.values(TiposID);
  public keySexo = Object.values(Sexo);

  pacientePrev:Paciente=new Paciente();

  paciente:Paciente=new Paciente();


  thisForm:RxFormGroup = <RxFormGroup>this.fb.group({
    tercero: this.fb.group({
      identificacion: [this.route.snapshot.paramMap.get("identificacion"), [RxwebValidators.required(),  RxwebValidators.minLength({value:4})]],
      tipoidentificacion: [this.paciente.tercero.tipoidentificacion,[RxwebValidators.required() ]],
      pnombre: [this.paciente.tercero.pnombre, [RxwebValidators.required(),  RxwebValidators.minLength({value:3})]],
      snombre: [this.paciente.tercero.snombre, [RxwebValidators.minLength({value:3})]],
      papellido: [this.paciente.tercero.papellido, [RxwebValidators.required(), RxwebValidators.minLength({value:3})]],
      sapellido: [this.paciente.tercero.sapellido,[RxwebValidators.minLength({value:3})] ],
      sexo: [this.paciente.tercero.sexo, [RxwebValidators.required()]],
      fechanacimiento: [this.paciente.tercero.fechanacimiento, [RxwebValidators.required()]],
      direccion: [this.paciente.tercero.direccion, [RxwebValidators.required()]],
      telefono: [this.paciente.tercero.telefono, [RxwebValidators.required(),RxwebValidators.minLength({value:7}) ,RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false })]],
      email: [this.paciente.tercero.email, [RxwebValidators.required(), RxwebValidators.email()]],
      foto: [this.paciente.tercero.foto,[RxwebValidators.extension({extensions:["jpeg","gif","png"]}),RxwebValidators.fileSize({maxSize:2000000 })]],
      estado: [this.paciente.tercero.estado]}),

      administradora: [this.paciente.administradora, [RxwebValidators.required(), RxwebValidators.minLength({value:4})]],
      tipo: [this.paciente.tipo, [RxwebValidators.required(), RxwebValidators.minLength({value:4})]],
      autorizacion: [this.paciente.autorizacion, [RxwebValidators.required(), RxwebValidators.minLength({value:4})]],
      talla: [this.paciente.talla, [RxwebValidators.required(), RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false }), RxwebValidators.minNumber({value:40 }), RxwebValidators.maxNumber({value:300 })]]
  }, {abstractControlOptions: {role:'blur'}});

  constructor(
    public _parametrosService:ParametrosService,
    private fb: RxFormBuilder,
    private router: Router,
    private _pacientesService:PacientesService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    configMessagesValidator();
    if(!this.paciente?.id){
      this.buscarIdentificacion();
    }
    this.route.snapshot.paramMap.get("identificacion")?this.patchvalue(this.thisForm.value):null;



  }

  guardar(){
    // console.log(this.thisForm);
    if(this.paciente){
      this.thisForm.value.id=this.paciente.id;
    }
    if(this.thisForm.valid){
    this._parametrosService.guardar(this.thisForm.value, 'pacientes').subscribe(
      (paciente:Paciente) =>{
        Toast.fire({icon:'success', title:`Paciente guardado correctamente`});
        // this.resetearForm();
        this.router.navigate(['/pacientes']);
      },

      err =>{ToastErrores(err);}
    );
    }else{
      Toast.fire({icon:'warning', title:`Debe llenar todos los campos requeridos del formulario`});
    }
  }

  buscarIdentificacion(){
    this.thisForm.get('tercero.identificacion').valueChanges.subscribe(
      val =>{
        this._pacientesService.buscarIdentificacion(val).subscribe(
          paciente=>{
            if(!this.paciente?.id){
            this.patchvalue(paciente);
            this.identificacionEncontrada= (paciente?.tercero.identificacion==null);
            this.pacientePrev=paciente;
            }
          }
        )
      }
    )
  }


  patchvalue(paciente:Paciente){
    this.thisForm.patchModelValue(paciente);
    this.paciente=paciente;
  }

}
