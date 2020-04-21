import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LIMITE } from '../../../config/config';
import { Usuario } from '../../../models/usuario.model';
import { TiposID, Sexo } from '../../../config/enums';
import { RxwebValidators, RxFormBuilder, NumericValueType } from '@rxweb/reactive-form-validators'
import { DatePipe } from '@angular/common';
import { configMessagesValidator } from '../../../config/messageValidators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
  providers: [DatePipe]
})
export class UsuariosComponent implements OnInit {
  
  public keyTipoId = Object.values(TiposID);
  public keySexo = Object.values(Sexo);
  

  usuario:Usuario=new Usuario();
  usuarios:Usuario[];
  totalUsuarios:number;
  p:any=1;
  limite=LIMITE;
  offset='0';
  buscar='';

  // usuarioForm= FormBuilder;
  usuarioForm = this.fb.group({
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
       foto: [this.usuario.tercero.foto,[RxwebValidators.extension({extensions:["jpeg","gif","png", "txt"]}),RxwebValidators.fileSize({maxSize:2000000 })]       
   ],
      // foto: [this.usuario.tercero.foto, [RxwebValidators.required, FileValidator.fileMaxSize(1), FileValidator.fileExtensions(['PNG', 'JPG'])]],
      estado: [this.usuario.tercero.estado]}),
    usuario: [this.usuario.usuario, [RxwebValidators.required(), RxwebValidators.minLength({value:4})]],
    password: [this.usuario.password, [RxwebValidators.required(), RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true}})]]
    // Usuario: this.fb.array([this.fb.control('')])
  });

  // usuarioForm = this.fb.group({
  //   tercero: this.fb.group({
  //     identificacion: ['', [RxwebValidators.required,  RxwebValidators.minLength(4)]],
  //     tipoidentificacion: ['',[RxwebValidators.required]],
  //     pnombre: ['', [RxwebValidators.required,  RxwebValidators.minLength(3)]],
  //     snombre: [''],
  //     papellido: ['', [RxwebValidators.required, RxwebValidators.minLength(3)]],
  //     sapellido: [''],
  //     sexo: ['', [RxwebValidators.required]],
  //     fechanacimiento: ['', [RxwebValidators.required]],
  //     direccion: ['', [RxwebValidators.required]],
  //     telefono: ['', [RxwebValidators.required]],
  //     email: ['', [RxwebValidators.required, RxwebValidators.email]],
  //     foto: ['', [RxwebValidators.required, FileValidator.fileMinSize(1), FileValidator.fileExtensions(['PNG', 'JPG'])]],
  //     estado: ['']}),
  //   usuario: ['',RxwebValidators.required],
  //   password: ['',RxwebValidators.required,],
  //   Usuario: this.fb.array([this.fb.control('')])
  // });
  // get Usuario(){
  //   return this.usuarioForm.get('Usuario') as FormArray;
  // }

  // addUsuario(){
  //   this.Usuario.push(this.fb.control(''));
    
  // }

  // usuarioForm= this.fb.group(new Usuario());

  constructor(private fb: RxFormBuilder, private cd: ChangeDetectorRef, public datepipe: DatePipe) { 
    // this.usuarioForm=this.crearUsuarioForm();
    // this.crearUsuarioForm();
    // console.log(this.usuarioForm.value);
  }

//   crearUsuarioForm(){
//     return this.fb.group(new Usuario());
// }



// get Usuario(){
//   return this.usuarioForm.get('Usuario') as FormArray;
// }

  ngOnInit(): void {
    configMessagesValidator();
  }

  getUsuarios(){
    
  }

  setUsuario(usuario:Usuario){
  }
    
  guardar(){
    // console.log(this.usuarioForm);
    
    // console.log(this.crearUsuarioForm().value);
     console.warn(this.usuarioForm.get('password'));
    // console.warn(this.usuarioForm.controls.tercero.controls.identificacion);
    // console.warn(this.usuarioForm.controls.tercero.controls.identificacion["errorMessage"]);
    //console.warn(''.log(this.Usuario.value);
    
  }

  verp(p:any){
    let limite=this.limite;
    let offset = (p-1)*(parseInt(limite));
    this.offset=offset.toString();
    this.getUsuarios();
  }


  // onFileChange(event) {
  //   console.log(event);
  //   let reader = new FileReader();
   
  //   if(event.target.files && event.target.files.length) {
  //     const [foto] = event.target.files;
  //     reader.readAsDataURL(foto);
    
  //     reader.onload = () => {
  //       this.usuarioForm.patchValue({
  //         foto: reader.result
  //       });
        
  //       // need to run CD since file load runs outside of zone
  //       this.cd.markForCheck();
  //     };
  //   }
  // }
}
