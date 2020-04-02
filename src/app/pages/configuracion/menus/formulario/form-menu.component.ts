import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { ModalService } from 'src/app/services/settings/modal.service';
import { Toast } from 'src/app/config/alertas';
import { ToastErrores } from '../../../../config/alertas';
import { Menu } from '../../../../models/configuraciones/menus.model';
import { MenusService } from '../../../../services/settings/menus.service';

@Component({
  selector: 'app-form-menu',
  templateUrl: './form-menu.component.html'
})
export class FormMenuComponent implements OnInit {

  @Input() menus:Menu;
  @ViewChild("descripcion") nombreField: ElementRef;


  constructor(
    public _modalService:ModalService,
    private _rolesService:MenusService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.focus();
  });

  }

  guardar(){
    this._rolesService.guardar(this.menus).subscribe(
      (menus:any) =>{
        this._modalService.notificarUpload.emit(this.menus);
        this.cerrarModal();
        this.menus=new Menu();
        Toast.fire({icon:'success', title:`Rol ${menus.descripcion} guardado correctamente`});
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
