import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../../services/settings/menus.service';
import { Menu } from '../../../models/configuraciones/menus.model';
import { RolesService } from '../../../services/settings/roles.service';
import { Role } from '../../../models/configuraciones/roles.model';
import { Toast, ToastErrores } from '../../../config/alertas';

@Component({
  selector: 'app-rolespermisos',
  templateUrl: './rolespermisos.component.html',
  styleUrls:['./rolespermisos.component.css']
})
export class RolespermisosComponent implements OnInit {

  buscar='';
  menus:any[];
  totalMenus:number;
  
  roles:Role[];
  totalRoles:number;
  selectedRole:number;
    
  constructor(
    private _menusService:MenusService,
    private _rolesService:RolesService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }


  getMenus(){
    this._menusService.cargar('30', '0', this.buscar)
    .subscribe(menus =>{
      this.totalMenus=menus.total;
      this.menus=menus.menus;

    })
    ;
  }

  getRoles(){
    this._rolesService.cargar('1000', '0','').subscribe(roles =>{
      this.totalRoles=roles.total;
      this.roles=roles.roles;
    })
  }

  listarPermisos(){
    console.log(this.buscar);
    this._menusService.cargarPermisos(this.selectedRole, this.buscar).subscribe(
      menus => this.menus=menus.menus
    )
  }

  getVentanaAccionId(value:number, checked:boolean){
    
    this._menusService.guardarPermisos(this.selectedRole, value, checked).subscribe(
      () => Toast.fire({icon:'success', title:'Permiso cambiado correctamente'}),
      err =>ToastErrores(err)

    );
    
  }
}
