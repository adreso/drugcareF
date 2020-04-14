import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/settings/modal.service';
import { MenusService } from '../../../services/settings/menus.service';
import { Menu } from '../../../models/configuraciones/menus.model';
import { LIMITE } from '../../../config/config';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styles: []
})
export class MenusComponent implements OnInit {

  menu:Menu = new Menu();
  menus:Menu[];
  menuSeleccionado:Menu;
  p:any=1;
  totalMenus:number;
  limite=LIMITE;
  offset='0';
  buscar='';

  constructor(
    public _menusService:MenusService,
    public _modalService:ModalService
  ) {

  }

  ngOnInit(): void {
    this.getMenus();
    this._modalService.notificarUpload.subscribe(()=>this.getMenus());
  }



  getMenus(){
    this._menusService.cargar(this.limite, this.offset, this.buscar).subscribe(
      menus => {
        this.totalMenus=menus.total;
        this.menus = menus.menus;
      }
      );
  }

  abrirModal(menu:Menu){
    this.menuSeleccionado=menu;
    this._modalService.abrirModal();
  }


  verp(p:any){
    let limite=this.limite;
    let offset = (p-1)*(parseInt(limite));
    this.offset=offset.toString();
    this.getMenus();
  }


}





