import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Departamento } from '../../../models/generales/departamentos.models';
import { DepartamentosService } from '../../../services/generales/departamentos.service';
import { ModalService } from 'src/app/services/settings/modal.service';
import { Toast, ToastErrores } from '../../../config/alertas';
import { PaisesService } from '../../../services/generales/paises.service';
import { Paise } from '../../../models/generales/paises.models';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styles: []
})
export class DepartamentosComponent implements OnInit {
  
  departamento:Departamento = new Departamento();
  departamentos:Departamento[];
  departamentoSeleccionado:Departamento;
  p:any=1;
  totalDepartamentos:number;
  limite='10';
  offset='0';
  buscar='';

  @ViewChild("nombre") nombreField: ElementRef;
  paises:Paise[];


  constructor(
    public _departamentosService:DepartamentosService,
    public _paisesService:PaisesService
  ) {

  }

  ngOnInit(): void {
    this.getDepartamentos();
    this.getPaises();
    setTimeout(() => {
      this.focusNombre();
  });
  }


  getDepartamentos(){
    this._departamentosService.cargar(this.limite, this.offset, this.buscar).subscribe(
      departamentos => {
        this.totalDepartamentos=departamentos.total;
        this.departamentos = departamentos.departamentos;
      }
      );
  }

  getPaises(){
    this._paisesService.cargarPaises('3000', '0', '').subscribe(
      paises =>{
        this.paises=paises.paises;
      }
    )
  }

  guardar(form:any){
    this._departamentosService.guardar(this.departamento).subscribe(
      (departamento:any) =>{
        
        
        Toast.fire({icon:'success', title:`Departamento ${this.departamento.nombre} guardado correctamente`});
          
          this.departamento=new Departamento();
          this.getDepartamentos();
          form.reset();
      },
      err => ToastErrores(err)
    );
  }

  verp(p:any){
    let limite=this.limite;
    let offset = (p-1)*(parseInt(limite));
    this.offset=offset.toString();
    this.getDepartamentos();
  }

  focusNombre():void{
    this.nombreField.nativeElement.focus();
  }

  setDepartamento(departament:Departamento){
    this.departamento=departament;
  }

  compararDepartamento(o1: Departamento, o2: Departamento): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
