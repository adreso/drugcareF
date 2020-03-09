import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  bordeQuitado:boolean=false;
  sizeTexto:boolean=false;
  sizeNavBar:boolean=false;
  sizeSidebar:boolean=false;
  sizeFooter:boolean=false;
  styleBarra:boolean=false;
  styleBarra2:boolean=false;
  compactSidebar:boolean=false;
  identarSidebar:boolean=false;
  noExpand:boolean=false;
  sizeLogo:boolean=false;

  constructor(
    @Inject(DOCUMENT) private _document,
    public _ajustes:SettingsService
    ) { }

  ngOnInit(): void {
    this.bordeQuitado=this._ajustes.bordeQuitado;
    this.sizeTexto=this._ajustes.bordeQuitado;
    this.sizeNavBar=this._ajustes.SizeNavBar;
    this.sizeSidebar=this._ajustes.SizeSidebar;
    this.sizeFooter=this._ajustes.SizeFooter;
    this.styleBarra=this._ajustes.styleBarra;
    this.styleBarra2=this._ajustes.styleBarra2;
    this.compactSidebar=this._ajustes.compactSidebar;
    this.identarSidebar=this._ajustes.identarSidebar;
    this.noExpand=this._ajustes.noExpand;
    this.sizeLogo=this._ajustes.sizeLogo;
  }

  cambiarBorde(e){
    this.bordeQuitado=e.target.checked;
    this._ajustes.cambiarAjustes("QuitarBorde",this.bordeQuitado);
  }

  cambiarSizeTexto(e){
    this.sizeTexto=e.target.checked;
    this._ajustes.cambiarAjustes("SizeTexto",this.sizeTexto);
  }
  TextNavBar(e){
    this.sizeNavBar=e.target.checked;
    this._ajustes.cambiarAjustes("SizeNavBar", this.sizeNavBar);
  }
  TextSidebar(e){
    this.sizeSidebar=e.target.checked;
    this._ajustes.cambiarAjustes("SizeSidebar", this.sizeSidebar);
  }

  TextFooter(e){
    this.sizeFooter=e.target.checked;
    this._ajustes.cambiarAjustes("SizeFooter", this.sizeFooter);
  }

  StyleIzquierda(e){
    this.styleBarra=e.target.checked;
    this._ajustes.cambiarAjustes("StyleIzquierda", this.styleBarra);
  }

  StyleIzquierda2(e){
    this.styleBarra2=e.target.checked;
    this._ajustes.cambiarAjustes("StyleIzquierda2", this.styleBarra2);
  }
  compactIzquierda(e){
    this.compactSidebar=e.target.checked;
    this._ajustes.cambiarAjustes("compactSidebar", this.compactSidebar);
  }

  identarIzquierda(e){
    this.identarSidebar=e.target.checked;
    this._ajustes.cambiarAjustes("identarSidebar", this.identarSidebar);
  }

  noExpandir(e){
    this.noExpand=e.target.checked;
    this._ajustes.cambiarAjustes("noExpand", this.noExpand);
  }
  sizeIcono(e){
    this.sizeLogo=e.target.checked;
    this._ajustes.cambiarAjustes("sizeLogo", this.sizeLogo);
  }



}
