import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  cambiar:boolean=false
  constructor(
    @Inject(DOCUMENT) private _document,
    public _ajustes:SettingsService
    ) { }

  ngOnInit(): void {
  }

  cambiarBorde(){

    // this._ajustes.tipo="border-bottom-0";
    // this._ajustes.variable="main-header";
    // this.cambiar=!this.cambiar;
    // if(this.cambiar){
    //   this._document.getElementsByClassName("main-header")[0].classList.add("border-bottom-0");
    // }else{
    //   this._document.getElementsByClassName("main-header")[0].classList.remove("border-bottom-0");
    // }

    this._ajustes.guardarAjustes();
    //.classList.add('border-bottom-0');
  }





}
