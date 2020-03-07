import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  bordeQuitado: boolean = false;
  sizeTexto:boolean=false;
  SizeNavBar:boolean=false;
  SizeSidebar:boolean=false;
  SizeFooter:boolean=false;
  styleBarra:boolean=false;
  styleBarra2:boolean=false;

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes(tipo:string, valor:boolean) {
    localStorage.setItem(tipo, valor + "");
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
    }
    this.guardarAjustes(tipo, cambiar);
  }
}
