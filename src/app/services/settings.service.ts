import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class SettingsService {

  navbar_dark_skins = [
    'navbar-primary',
    'navbar-secondary',
    'navbar-info',
    'navbar-success',
    'navbar-danger',
    'navbar-indigo',
    'navbar-purple',
    'navbar-pink',
    'navbar-navy',
    'navbar-lightblue',
    'navbar-teal',
    'navbar-cyan',
    'navbar-dark',
    'navbar-gray-dark',
    'navbar-gray',
  ];

  navbar_light_skins = [
    'navbar-light',
    'navbar-warning',
    'navbar-white',
    'navbar-orange',
    'navbar-red'
  ];


  bordeQuitado: boolean = false;
  sizeTexto:boolean=false;
  SizeNavBar:boolean=false;
  SizeSidebar:boolean=false;
  SizeFooter:boolean=false;
  styleBarra:boolean=false;
  styleBarra2:boolean=false;
  compactSidebar:boolean=false;
  identarSidebar:boolean=false;
  noExpand:boolean=false;
  sizeLogo:boolean=false;

  colorSelNavBar:string='navbar-dark';

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes(tipo:string, valor:boolean) {
    localStorage.setItem(tipo, valor + "");
  }
  guardarAjustes2(tipo:string, valor:string) {
    localStorage.setItem(tipo, valor);
  }

  cargarAjustes() {
    if (localStorage.getItem("QuitarBorde")) {
      this.bordeQuitado = localStorage.getItem("QuitarBorde") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("QuitarBorde", this.bordeQuitado);
      });
    }

    if (localStorage.getItem("SizeTexto")) {
      this.sizeTexto = localStorage.getItem("SizeTexto") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("SizeTexto", this.sizeTexto);
      });
    }

    if (localStorage.getItem("SizeNavBar")) {
      this.SizeNavBar = localStorage.getItem("SizeNavBar") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("SizeNavBar", this.SizeNavBar);
      });
    }

    if (localStorage.getItem("SizeSidebar")) {
      this.SizeSidebar = localStorage.getItem("SizeSidebar") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("SizeSidebar", this.SizeSidebar);
      });
    }

    if (localStorage.getItem("SizeFooter")) {
      this.SizeFooter = localStorage.getItem("SizeFooter") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("SizeFooter", this.SizeFooter);
      });
    }

    if (localStorage.getItem("StyleIzquierda")) {
      this.styleBarra = localStorage.getItem("StyleIzquierda") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("StyleIzquierda", this.styleBarra);
      });
    }
    if (localStorage.getItem("StyleIzquierda2")) {
      this.styleBarra2 = localStorage.getItem("StyleIzquierda2") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("StyleIzquierda2", this.styleBarra2);
      });
    }
    if (localStorage.getItem("compactSidebar")) {
      this.compactSidebar = localStorage.getItem("compactSidebar") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("compactSidebar", this.compactSidebar);
      });
    }
    if (localStorage.getItem("identarSidebar")) {
      this.identarSidebar = localStorage.getItem("identarSidebar") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("identarSidebar", this.identarSidebar);
      });
    }
    if (localStorage.getItem("noExpand")) {
      this.noExpand = localStorage.getItem("noExpand") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("noExpand", this.noExpand);
      });
    }
    if (localStorage.getItem("sizeLogo")) {
      this.sizeLogo = localStorage.getItem("sizeLogo") == "true";
      window.addEventListener("load", () => {
        this.cambiarAjustes("sizeLogo", this.sizeLogo);
      });
    }

    if(localStorage.getItem("colorNavBar")){
      this.colorSelNavBar=localStorage.getItem("colorNavBar");
      window.addEventListener("load", () => {
        this.cambiarAjustes2("colorNavBar", this.colorSelNavBar);
      });
    }

  }

  cambiarAjustes(tipo:string, cambiar: boolean) {

    switch (tipo) {
      case "QuitarBorde":
        this.bordeQuitado = cambiar;
        if (cambiar) {
          this._document.getElementsByClassName("main-header")[0].classList.remove("border-bottom-0");
        } else {
          this._document.getElementsByClassName("main-header")[0].classList.add("border-bottom-0");
        }
        break;

      case "SizeTexto":
        this.sizeTexto=cambiar;
        if (cambiar) {
          this._document.getElementsByTagName("body")[0].classList.add("text-sm");
        } else {
          this._document.getElementsByTagName("body")[0].classList.remove("text-sm");
        }
        break;

        case "SizeNavBar":
          this.SizeNavBar=cambiar;
          if(cambiar){
            this._document.getElementsByClassName("main-header")[0].classList.add("text-sm");
          } else {
            this._document.getElementsByClassName("main-header")[0].classList.remove("text-sm");
          }
          break;

        case "SizeSidebar":
          this.SizeSidebar=cambiar;
          if(cambiar){
            this._document.getElementsByClassName("nav-sidebar")[0].classList.add("text-sm");
          } else {
            this._document.getElementsByClassName("nav-sidebar")[0].classList.remove("text-sm");
          }
          break;
        case "SizeFooter":
          this.SizeFooter=cambiar;
          if(cambiar){
            this._document.getElementsByClassName("main-footer")[0].classList.add("text-sm");
          } else {
            this._document.getElementsByClassName("main-footer")[0].classList.remove("text-sm");
          }
          break;

        case "StyleIzquierda":
          this.styleBarra=cambiar;
          if(cambiar){
            this._document.getElementsByClassName("nav-sidebar")[0].classList.add("nav-flat");
          } else {
            this._document.getElementsByClassName("nav-sidebar")[0].classList.remove("nav-flat");
          }
          break;

          case "StyleIzquierda2":
          this.styleBarra2=cambiar;
          if(cambiar){
            this._document.getElementsByClassName("nav-sidebar")[0].classList.add("nav-legacy");
          } else {
            this._document.getElementsByClassName("nav-sidebar")[0].classList.remove("nav-legacy");
          }
          break;
          case "compactSidebar":
          this.compactSidebar=cambiar;
          if(cambiar){
            this._document.getElementsByClassName("nav-sidebar")[0].classList.add("nav-compact");
          } else {
            this._document.getElementsByClassName("nav-sidebar")[0].classList.remove("nav-compact");
          }
          break;
          case "identarSidebar":
          this.identarSidebar=cambiar;
          if(cambiar){
            this._document.getElementsByClassName("nav-sidebar")[0].classList.add("nav-child-indent");
          } else {
            this._document.getElementsByClassName("nav-sidebar")[0].classList.remove("nav-child-indent");
          }
          break;
          case "noExpand":
          this.noExpand=cambiar;
          if(cambiar){
            this._document.getElementsByClassName("main-sidebar")[0].classList.add("sidebar-no-expand");
          } else {
            this._document.getElementsByClassName("main-sidebar")[0].classList.remove("sidebar-no-expand");
          }
          break;
          case "sizeLogo":
          this.sizeLogo=cambiar;
          if(cambiar){
            this._document.getElementsByClassName("brand-link")[0].classList.add("text-sm");
          } else {
            this._document.getElementsByClassName("brand-link")[0].classList.remove("text-sm");
          }
          break;
    }
    this.guardarAjustes(tipo, cambiar);
  }

  cambiarAjustes2(tipo:string, cambiar:string){
    const mainHeader =this._document.getElementsByClassName("main-header")[0].classList;
    var all_colors = this.navbar_dark_skins.concat(this.navbar_light_skins);

    mainHeader.remove("navbar-dark");
    mainHeader.remove("navbar-light");

    all_colors.map(function (color) {
      mainHeader.remove(color);
    });

    if(this.navbar_light_skins.indexOf(cambiar)>-1){
      mainHeader.add("navbar-light");
    }else{
      mainHeader.add("navbar-dark");
    }
    mainHeader.add(cambiar);


    this.colorSelNavBar=cambiar;
    this.guardarAjustes2("colorNavBar", this.colorSelNavBar);
  }
}
