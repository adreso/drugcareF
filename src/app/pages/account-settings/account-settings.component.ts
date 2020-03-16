import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/settings/settings.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  sidebar_colors = [
    'bg-primary',
    'bg-warning',
    'bg-info',
    'bg-danger',
    'bg-success',
    'bg-indigo',
    'bg-lightblue',
    'bg-navy',
    'bg-purple',
    'bg-fuchsia',
    'bg-pink',
    'bg-maroon',
    'bg-orange',
    'bg-lime',
    'bg-teal',
    'bg-olive'
  ];

  sidebar_skins = [
    'sidebar-dark-primary',
    'sidebar-dark-warning',
    'sidebar-dark-info',
    'sidebar-dark-danger',
    'sidebar-dark-success',
    'sidebar-dark-indigo',
    'sidebar-dark-lightblue',
    'sidebar-dark-navy',
    'sidebar-dark-purple',
    'sidebar-dark-fuchsia',
    'sidebar-dark-pink',
    'sidebar-dark-maroon',
    'sidebar-dark-orange',
    'sidebar-dark-lime',
    'sidebar-dark-teal',
    'sidebar-dark-olive',
    'sidebar-light-primary',
    'sidebar-light-warning',
    'sidebar-light-info',
    'sidebar-light-danger',
    'sidebar-light-success',
    'sidebar-light-indigo',
    'sidebar-light-lightblue',
    'sidebar-light-navy',
    'sidebar-light-purple',
    'sidebar-light-fuchsia',
    'sidebar-light-pink',
    'sidebar-light-maroon',
    'sidebar-light-orange',
    'sidebar-light-lime',
    'sidebar-light-teal',
    'sidebar-light-olive'
  ];

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

  colorSelNavBar:string='navbar-dark';
  colorAccents:string='accent-primary';

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

    this.colocarCheckNavBar();
    this.colocarAccent();
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

  colorNavBar(color:string, link:ElementRef){
  this.aplicarCheckNavBar(link);
  this.colorSelNavBar=color;
  this._ajustes.cambiarAjustes2('colorNavBar',color);
  }

  aplicarCheckNavBar(link:any){
    let selectores:any = document.getElementsByClassName('btn-link');
    for(let ref of selectores){
      ref.classList.remove('btn-outline-warning');
    }
    link.classList.add('btn-outline-warning');
  }

  colocarCheckNavBar(){
    let selectores:any = document.getElementsByClassName('btn-link');
    for(let ref of selectores){
      if(ref.getAttribute('data-theme') === this._ajustes.colorSelNavBar){
        ref.classList.add('btn-outline-warning');
        break;
      }
    }
  }

  colorAccent(color:string, link:ElementRef){
    this.aplicarCheckAccent(link);
    this.colorAccents=color;
    this._ajustes.cambiarAjustes2('colorAccent', color)
  }
  aplicarCheckAccent(link:any){
    let selectores:any = document.getElementsByClassName('btn-default');
    for(let ref of selectores){
      ref.classList.remove('border-danger');
    }
    link.classList.add('border-danger');
  }

  colocarAccent(){
    let selectores:any = document.getElementsByClassName('btn-default');
    for(let ref of selectores){
      if(ref.getAttribute('data-theme2') === this._ajustes.colorSelNavBar){
        ref.classList.add('border-danger');
        break;
      }
    }
  }

  colorSidebar(color:string, enlace:ElementRef){
    this.sidebar_skins.map(function (skin) {
      document.getElementsByClassName("main-sidebar")[0].classList.remove(skin);
    });
    document.getElementsByClassName("main-sidebar")[0].classList.add(color);
  }


}
