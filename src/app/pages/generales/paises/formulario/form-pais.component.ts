import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { ModalService } from 'src/app/services/settings/modal.service';
import { PaisesService } from 'src/app/services/generales/paises.service';
import { Paise } from 'src/app/models/generales/paises.models';
import { Toast } from 'src/app/config/alertas';
import { ToastErrores } from '../../../../config/alertas';

@Component({
  selector: 'app-form-pais',
  templateUrl: './form-pais.component.html',
  styleUrls:['./form-pais.component.css']
})
export class FormPaisComponent implements OnInit {

  @Input() pais:Paise;
  @ViewChild("nombre") nombreField: ElementRef;


  constructor(
    public _modalService:ModalService,
    private _paisesService:PaisesService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.focusNombre();
  });

  }

  guardar(){
    this._paisesService.guardarMedico(this.pais).subscribe(
      (pais:any) =>{
        this._modalService.notificarUpload.emit(this.pais);
        this.cerrarModal();
        this.pais=new Paise();
        Toast.fire({icon:'success', title:`Pais ${pais.nombre} guardado correctamente`});
      },
      err => ToastErrores(err)
    );
  }

    cerrarModal(){
      this._modalService.cerrarModal();
      this._modalService.notificarUpload.emit(false);

    }

    focusNombre():void{
      this.nombreField.nativeElement.focus();
    }

}
