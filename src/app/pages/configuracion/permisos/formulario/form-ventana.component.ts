import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Ventana } from '../../../../models/configuraciones/ventanas.models';
import { ModalService } from '../../../../services/settings/modal.service';
import { PermisosService } from '../../../../services/settings/permisos.service';
import { Toast, ToastErrores } from '../../../../config/alertas';
import { Menu } from '../../../../models/configuraciones/menus.model';
import { MenusService } from '../../../../services/settings/menus.service';


@Component({
  selector: 'app-form-ventana',
  templateUrl: './form-ventana.component.html',
  styles: []
})
export class FormVentanaComponent implements OnInit {

  @Input() ventana:Ventana;
  @ViewChild("descripcion") Field: ElementRef;

  menus:Menu[];

  constructor(
    public _modalService:ModalService,
    public _permisoService:PermisosService,
    public _menuService:MenusService
  ) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.focus();
  });
  this.cargarMenus();
  }

  cerrarModal(){
    // this._modalService.cerrarModal();
    // this._modalService.notificarUpload.emit(false);
    this._modalService.cerrarModalVentana("permiso");
  }

  guardar(){
    this._permisoService.guardarVentana(this.ventana).subscribe(
      (ventana:any) =>{
        this._modalService.notificarUpload.emit(this.ventana);
        this.cerrarModal();
        this.ventana=new Ventana();
        Toast.fire({icon:'success', title:`Ventana ${ventana.descripcion} guardada correctamente`});
      },

        err=>{
          ToastErrores(err);
        }
      );
  }

  cargarMenus(){
    this._menuService.cargar('30', '0', '').subscribe(
      menus =>{
        this.menus=menus.menus;
      }
    )
  }

  compararMenu(o1: Menu, o2: Menu): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  focus(){
      // this.Field.nativeElement.focus();
  }
}
