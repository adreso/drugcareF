import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ciudade } from '../../../models/generales/ciudades.models';
import { Departamento } from '../../../models/generales/departamentos.models';
import { CiudadesService } from '../../../services/generales/ciudades.service';
import { DepartamentosService } from 'src/app/services/generales/departamentos.service';
import { Toast, ToastErrores } from '../../../config/alertas';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, catchError } from 'rxjs/operators';
import { LIMITE } from '../../../config/config';



@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styles: []
})
export class CiudadesComponent implements OnInit {

  //combo Typeahead
    @ViewChild('instance', {static: true}) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();
  
    search = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
      const inputFocus$ = this.focus$;
  
      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => (term === '' ? this.departamentos
          : this.departamentos.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
    }
    formatter = (x: {nombre: string}) => x.nombre;
    buscarCombo='';
  // fin combo Typeahead

  ciudade:Ciudade = new Ciudade();
  ciudades:Ciudade[];
  ciudadeSeleccionado:Ciudade;
  p:any=1;
  totalCiudades:number;
  limite=LIMITE;
  offset='0';
  buscar='';

  @ViewChild("nombre") nombreField: ElementRef;
  departamentos:Departamento[];

  
  constructor(
    public _ciudadesService:CiudadesService,
    public _departamentosService:DepartamentosService
  ) {

  }

  ngOnInit(): void {
    this.getCiudades();
    this.getDepartamentos(this.buscarCombo);
    setTimeout(() => {
      this.focusNombre();
  });
  }


  getCiudades(){
    this._ciudadesService.cargar(this.limite, this.offset, this.buscar).subscribe(
      ciudades => {
        this.totalCiudades=ciudades.total;
        this.ciudades = ciudades.ciudades;
      }
      );
  }

  getDepartamentos(buscar:string){
    this._departamentosService.cargar('5', '0',buscar).subscribe(
      departamentos =>{
        this.departamentos=departamentos.departamentos;
      }
    )
  }

  

  guardar(form:any){
    // console.log(this.ciudade);
    this._ciudadesService.guardar(this.ciudade).subscribe(
      (ciudade:any) =>{
        Toast.fire({icon:'success', title:`Ciudad ${this.ciudade.nombre} guardado correctamente`});
          
          this.ciudade=new Ciudade();
          this.getCiudades();
          form.reset();
      },
      err => ToastErrores(err)
    );
  }

  verp(p:any){
    let limite=this.limite;
    let offset = (p-1)*(parseInt(limite));
    this.offset=offset.toString();
    this.getCiudades();
  }

  focusNombre():void{
    this.nombreField.nativeElement.focus();
  }

  setCiudade(ciudade:Ciudade){
    this.ciudade=ciudade;
  }

  compararDepartamento(o1: Ciudade, o2: Ciudade): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
