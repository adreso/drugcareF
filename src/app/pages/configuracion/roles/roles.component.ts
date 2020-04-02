import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/settings/modal.service';
import { RolesService } from '../../../services/settings/roles.service';
import { Role } from '../../../models/configuraciones/roles.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: []
})
export class RolesComponent implements OnInit {

  role:Role = new Role();
  roles:Role[];
  roleSeleccionado:Role;
  p:any=1;
  totalRoles:number;
  limite='10';
  offset='0';
  buscar='';

  constructor(
    public _rolesService:RolesService,
    public _modalService:ModalService
  ) {

  }

  ngOnInit(): void {
    this.getRoles();
    this._modalService.notificarUpload.subscribe(()=>this.getRoles());
  }



  getRoles(){
    this._rolesService.cargar(this.limite, this.offset, this.buscar).subscribe(
      roles => {
        this.totalRoles=roles.total;
        this.roles = roles.roles;
      }
      );
  }

  abrirModal(role:Role){
    this.roleSeleccionado=role;
    this._modalService.abrirModal();
  }


  verp(p:any){
    let limite=this.limite;
    let offset = (p-1)*(parseInt(limite));
    this.offset=offset.toString();
    this.getRoles();
  }


}





