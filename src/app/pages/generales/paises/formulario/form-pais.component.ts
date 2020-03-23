import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { ModalService } from 'src/app/services/settings/modal.service';
import { PaisesService } from 'src/app/services/generales/paises.service';
import { Paise } from 'src/app/models/generales/paises.models';
import { Toast } from 'src/app/config/alertas';

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


    ) {

    }

  ngOnInit(): void {

    setTimeout(() => {
      this.focusNombre();
  });

  }

  guardar(){
    // console.log(this.pais);

    this._paisesService.guardarMedico(this.pais).subscribe(
      resp =>{
        this._modalService.notificarUpload.emit(this.pais);
        this.cerrarModal();
        this.pais=new Paise();
        Toast.fire({icon:'success', title:'Pais guardado correctamente'})
      }
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
