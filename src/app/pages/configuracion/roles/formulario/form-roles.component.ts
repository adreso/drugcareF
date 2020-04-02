import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { ModalService } from 'src/app/services/settings/modal.service';
import { PaisesService } from 'src/app/services/generales/paises.service';
import { Toast } from 'src/app/config/alertas';
import { ToastErrores } from '../../../../config/alertas';
import { Role } from '../../../../models/configuraciones/roles.model';
import { RolesService } from '../../../../services/settings/roles.service';

@Component({
  selector: 'app-form-roles',
  templateUrl: './form-roles.component.html'
})
export class FormRolesComponent implements OnInit {

  @Input() roles:Role;
  @ViewChild("descripcion") nombreField: ElementRef;


  constructor(
    public _modalService:ModalService,
    private _rolesService:RolesService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.focus();
  });

  }

  guardar(){
    this._rolesService.guardar(this.roles).subscribe(
      (roles:any) =>{
        this._modalService.notificarUpload.emit(this.roles);
        this.cerrarModal();
        this.roles=new Role();
        Toast.fire({icon:'success', title:`Rol ${roles.descripcion} guardado correctamente`});
      },
      err => ToastErrores(err)
    );
  }

    cerrarModal(){
      this._modalService.cerrarModal();
      this._modalService.notificarUpload.emit(false);

    }

    focus():void{
      this.nombreField.nativeElement.focus();
    }

}
