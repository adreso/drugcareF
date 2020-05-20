import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { LIMITE } from '../../../config/config';
import { Usuario } from '../../../models/usuario.model';
import { TiposID, Sexo } from '../../../config/enums';
import { RxwebValidators, RxFormBuilder, NumericValueType, RxFormGroup } from '@rxweb/reactive-form-validators';
import { configMessagesValidator, resetForm } from '../../../config/messageValidators';
import { UsuariosService } from '../../../services/generales/usuarios.service';
import { Role } from '../../../models/configuraciones/roles.model';
import { RolesService } from '../../../services/settings/roles.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, merge, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, filter, map } from 'rxjs/operators';
import { Toast, ToastErrores } from '../../../config/alertas';
import { ModalService } from 'src/app/services/settings/modal.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

//combo Typeahead
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.roles
        : this.roles.filter(v => v.descripcion.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  formatter = (x: {descripcion: string}) => x.descripcion;
  buscarCombo='';
// fin combo Typeahead

public keyTipoId = Object.values(TiposID);
public keySexo = Object.values(Sexo);
roles:Role[];

usuario:Usuario=new Usuario();
usuarioPrev:Usuario=new Usuario();

usuarios:Usuario[];
totalUsuarios:number;
p:any=1;
limite=LIMITE;
offset='0';
buscar='';
identificacionEncontrada:boolean=true;
emailEncontrado:boolean=true;
usuarioEncontrado:boolean=true;
@ViewChild("identificacion") identificacionField: ElementRef;

idUsuarioSeleccionado:Usuario;

  usuarioForm:RxFormGroup = <RxFormGroup>this.fb.group({
    tercero: this.fb.group({
      identificacion: [this.usuario.tercero.identificacion, [RxwebValidators.required(),  RxwebValidators.minLength({value:4})]],
      tipoidentificacion: [this.usuario.tercero.tipoidentificacion,[RxwebValidators.required() ]],
      pnombre: [this.usuario.tercero.pnombre, [RxwebValidators.required(),  RxwebValidators.minLength({value:3})]],
      snombre: [this.usuario.tercero.snombre, [RxwebValidators.minLength({value:3})]],
      papellido: [this.usuario.tercero.papellido, [RxwebValidators.required(), RxwebValidators.minLength({value:3})]],
      sapellido: [this.usuario.tercero.sapellido,[RxwebValidators.minLength({value:3})] ],
      sexo: [this.usuario.tercero.sexo, [RxwebValidators.required()]],
      fechanacimiento: [this.usuario.tercero.fechanacimiento, [RxwebValidators.required()]],
      direccion: [this.usuario.tercero.direccion, [RxwebValidators.required()]],
      telefono: [this.usuario.tercero.telefono, [RxwebValidators.required(),RxwebValidators.minLength({value:7}) ,RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false })]],
      email: [this.usuario.tercero.email, [RxwebValidators.required(), RxwebValidators.email()]],
      foto: [this.usuario.tercero.foto,[RxwebValidators.extension({extensions:["jpeg","gif","png"]}),RxwebValidators.fileSize({maxSize:2000000 })]],
      estado: [this.usuario.tercero.estado]}),

      usuario: [this.usuario.usuario, [RxwebValidators.required(), RxwebValidators.minLength({value:4})]],
      password: [this.usuario.password, [RxwebValidators.required()]],
      role:['', RxwebValidators.required()]
  }, {abstractControlOptions: {role:'blur'}});

  constructor(
    private fb: RxFormBuilder,
    private cd: ChangeDetectorRef,
    public _usuariosService:UsuariosService,
    public _roleService:RolesService,
    public _modalService:ModalService
    ) {
  }

onFormsChanges(){
  this.usuarioForm.get('role').valueChanges.subscribe(val => {
    if (typeof(val) === 'string') {
      const empFinded = this.roles.find(x =>
          (x.descripcion.toUpperCase()) === val.toUpperCase() || x.descripcion.toUpperCase() === val.toUpperCase());
      this.usuarioForm.get('role').patchValue(empFinded);
    }
  });

}

  ngOnInit(): void {
    configMessagesValidator();
    this.getRoles(this.buscarCombo);
    this.onFormsChanges();
    this.buscarIdentificacion();
    this.buscarEmail();
    this.buscarUsuario();
    setTimeout(() => {
      this.focus();
    });
    this.cargar();
    this._modalService.notificarUpload.subscribe(()=>this.idUsuarioSeleccionado);
  }

  getRoles(buscar:string){
    this._roleService.cargar('5', '0', buscar).subscribe(
      roles =>{
        this.roles=roles.roles;
      }
    )
  }

  patchvalue(usuario:Usuario){
    this.usuarioForm.patchModelValue(usuario);
    this.usuario=usuario;
  }

  resetearForm(){
    this.usuarioForm.reset();
    resetForm(this.usuarioForm);
  }

  guardar(){
    if(this.usuario){
     this.usuarioForm.value.id=this.usuario.id;
    }
   if(this.usuarioForm.valid){
    this._usuariosService.guardar(this.usuarioForm.value).subscribe(
      (usuario:Usuario) =>{
        Toast.fire({icon:'success', title:`Usuario guardado correctamente`});
        this.resetearForm();
        this.focus();
        this.cargar();
      },
      err =>ToastErrores(err)
    );
   }else{
    Toast.fire({icon:'warning', title:`Debe llenar todos los campos requeridos del formulario`});
   }
  }

  cargar(){
    this._usuariosService.cargar(this.limite, this.offset, this.buscar).subscribe(
      usuarios => {
        this.totalUsuarios=usuarios.total;
        this.usuarios = usuarios.usuarios;
      }
    );
  }

  buscarIdentificacion(){
    this.usuarioForm.get('tercero.identificacion').valueChanges.subscribe(
      val =>{
        this._usuariosService.buscarIdentificacion(val).subscribe(
          usuario=>{
            this.identificacionEncontrada= (usuario?.tercero.identificacion==null);
            this.usuarioPrev=usuario;
          }
        )
      }
    )
  }
  buscarEmail(){
    this.usuarioForm.get('tercero.email').valueChanges.subscribe(
      val =>{
        this._usuariosService.buscarEmail(val).subscribe(
          usuario=>{
            this.emailEncontrado= (usuario?.tercero.email==null);
            this.usuarioPrev=usuario;
          }
        )
      }
    )
  }
  buscarUsuario(){
    this.usuarioForm.get('usuario').valueChanges.subscribe(
      val =>{
        this._usuariosService.buscarUsuario(val).subscribe(
          usuario=>{
            this.usuarioEncontrado= (usuario?.usuario==null);
            this.usuarioPrev=usuario;
          }
        )
      }
    )
  }
  verp(p:any){
    let limite=this.limite;
    let offset = (p-1)*(parseInt(limite));
    this.offset=offset.toString();
    this.cargar();
  }

  focus():void{
    this.identificacionField.nativeElement.focus();
  }

  abrirModal(usuario:Usuario){
     console.log(usuario);
    this.idUsuarioSeleccionado=usuario;
    // console.log(this.idUsuarioSeleccionado);
    this._modalService.abrirModal();
  }
}
